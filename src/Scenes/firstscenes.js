/*
-------------------------------------- import -----------------------------------
*/
import {
    ActionManager,
    ArcRotateCamera,
    Color3,
    Engine,
    GizmoManager,
    InterpolateValueAction,
    MeshBuilder,
    PlaneRotationGizmo,
    PointLight,
    Scene,
    StandardMaterial,
    Texture,
    UtilityLayerRenderer,
    Vector3
} from "@babylonjs/core"

const createScene = (canvas) => {
    /*
     ----------------------------------- CREATE SCENE  -------------------------------
    */

    const engine = new Engine(canvas);
    const scene = new Scene(engine);
    scene.clearColor = new Color3(0.4, 0.3, 0.3)

    /*
     ----------------------------------------- Camera ---------------------------------
    */
    const camera = new ArcRotateCamera("Camera", 0, 0, 0, new Vector3(10, 10, -12), scene);
    camera.setTarget(new Vector3(0, 0, 0));
    camera.attachControl(canvas, true);

    /*
     ----------------------------------------- Lights ---------------------------------
    */

    const light = new PointLight("light", new Vector3(10, 10, 0), scene);
    light.intensity = 0.5

    /*
    ----------------------------------------- PLATFORMS ---------------------------------
    */

    const platform = MeshBuilder.CreateBox("box", {
            width: 10,
            height: 0,
            depth: 10
        },
        scene
    );
    const BoxMaterial = new StandardMaterial("material", scene);
    BoxMaterial.emissiveTexture = new Texture('https://img2.akspic.ru/previews/8/3/5/9/6/169538/169538-chernyy-seryj_cvet-tsvetnoy-sinij-svet-550x310.jpg')
    platform.material = BoxMaterial
    platform.receiveShadows = true

    /*
   ----------------------------------------- Qube ---------------------------------
   */
    const qube = MeshBuilder.CreateBox("box", {
            width: 2,
            height: 2,
            depth: 2
        },
        scene
    );
    const QubeMaterial = new StandardMaterial("material", scene);
    qube.material = QubeMaterial
    QubeMaterial.emissiveTexture = new Texture('https://avatars.mds.yandex.net/i?id=c30e9794de6f15e218c3329477afd50684a4e323-8482868-images-thumbs&n=13')
    qube.position.y = 2
    /*
    * ---------------------------------------CREATE SECTION -------------------------------
    */
    /*
    -------------- SPHERE-------------------------------- ---------------------------------
    */
    const createSpehere = () => {
        const sphere = MeshBuilder.CreateSphere('spheres', {
            segments: 10,
            diameter: 1,
        }, scene)
        sphere.position.y = 4;
    }
    /*
   -------------- QUBE-------------------------------- ---------------------------------
   */

    const createQube = () => {
        const qube = MeshBuilder.CreateBox('box', {
            width: 1,
            height: 1,
            depth: 1,
        }, scene)
        qube.position.y = 4;
    }
    /*
    ----------------------------------------- RENDER ---------------------------------
    */
    engine.runRenderLoop(() => {
        scene.render();
    });

    /*
    ----------------------------------------- GIZMOS ---------------------------------
    */

    const gizmoManager = new GizmoManager(scene)
    const utilLayer = new UtilityLayerRenderer(scene);
    const gizmo = new PlaneRotationGizmo(new Vector3(0, 1, 0));

    /*
    -------------------------------- TEST-- AddEventListener BTN ---TEST  -------------------------
    */
    const PositionBtn = document.querySelector('#positionBtn')
    PositionBtn.addEventListener('click', () => {
        gizmoManager.positionGizmoEnabled = !gizmoManager.positionGizmoEnabled
        if (gizmoManager.positionGizmoEnabled) {
            gizmoManager.rotationGizmoEnabled = false
            gizmoManager.scaleGizmoEnabled = false
            gizmoManager.boundingBoxGizmoEnabled = false
        }

    })
    const rotateBtn = document.querySelector('#rotateBtn')
    rotateBtn.addEventListener('click', () => {
        gizmoManager.rotationGizmoEnabled = !gizmoManager.rotationGizmoEnabled
        if (gizmoManager.rotationGizmoEnabled) {
            gizmoManager.positionGizmoEnabled = false
            gizmoManager.scaleGizmoEnabled = false
            gizmoManager.boundingBoxGizmoEnabled = false

        }

    })
    const scaleBtn = document.querySelector('#scaleBtn')
    scaleBtn.addEventListener('click', () => {
        gizmoManager.scaleGizmoEnabled = !gizmoManager.scaleGizmoEnabled
        if (gizmoManager.scaleGizmoEnabled) {
            gizmoManager.positionGizmoEnabled = false
            gizmoManager.boundingBoxGizmoEnabled = false
            gizmoManager.rotationGizmoEnabled = false
        }
    })
    const boundBtn = document.querySelector('#boundBtn')
    boundBtn.addEventListener('click', () => {
        gizmoManager.boundingBoxGizmoEnabled = !gizmoManager.boundingBoxGizmoEnabled
        if (gizmoManager.boundingBoxGizmoEnabled) {
            gizmoManager.positionGizmoEnabled = false
            gizmoManager.rotationGizmoEnabled = false
            gizmoManager.scaleGizmoEnabled = false
        }
    })
    /*---------------------Create function----------------------------*/
    const spherebtn = document.querySelector('#addSphere')
    spherebtn.addEventListener("click", createSpehere)

    const qubeBtn = document.querySelector('#qubeBtn')
    qubeBtn.addEventListener("click", createQube)
    /*
    --------------------------------------------- ACTIONS  ----------------------------------------
    */
    qube.actionManager = new ActionManager(scene);
    qube.actionManager
        .registerAction(
            new InterpolateValueAction(
                ActionManager.OnPickTrigger,
                light,
                'diffuse',
                new Color3(0, 0, 1),
                1000
            )
        )
        .then(
            new InterpolateValueAction(
                ActionManager.OnPickTrigger,
                camera,
                '',
            )
        )
}
export {createScene};



