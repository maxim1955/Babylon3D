/*
-------------------------------------- import -----------------------------------
*/
import {
    ActionManager,
    ArcRotateCamera,
    Color3,
    Engine,
    ExecuteCodeAction,
    GizmoManager,
    InterpolateValueAction,
    MeshBuilder,
    PointLight,
    Scene,
    StandardMaterial,
    Texture,
    Vector3,
    CubeTexture,
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
    light.intensity = 0.6

    /*
    ---------------------------------------- SKY BOX -----------------------------------
    */
        const envTexture = new CubeTexture("https://assets.babylonjs.com/environments/environmentSpecular.env", scene);
        scene.createDefaultSkybox(envTexture, true, 1000);
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
    qube.position.y = 1.5
    /*
    * ---------------------------------------CREATE OBJECTS SECTION -------------------------------
    */
    /*
    -------------- SPHERE--------------------------------------------------------------------------
    */
    const createSpehere = () => {
        const sphere = MeshBuilder.CreateSphere('spheres', {
            segments: 10,
            diameter: 1,
        }, scene)
        sphere.position.y = 4;
    }
    /*
   -------------- QUBE------------------------------------------------------------------------------
   */

    const createQube = () => {
        const qube = MeshBuilder.CreateBox('box', {
            width: 1,
            height: 1,
            depth: 1,
        }, scene)
        qube.position.y = 6;
    }
    /*
    ----------------------------------------- RENDER ----------------------------------------------
    */
    engine.runRenderLoop(() => {
        scene.render();
    });

    /*
    ----------------------------------------- INITIALIZE GIZMOS -----------------------------------------------
    */

    const gizmoManager = new GizmoManager(scene)
    /*
    -------------------------------- TEST-- AddEventListener BTN ---TEST  -------------------------
    */
    const PositionBtn = document.querySelector('#positionBtn')
    PositionBtn.addEventListener('click', () => {
        gizmoManager.positionGizmoEnabled = !gizmoManager.positionGizmoEnabled
        if (gizmoManager.positionGizmoEnabled) {
            PositionBtn.classList.add('bg-green')
            rotateBtn.classList.remove('bg-green')
            scaleBtn.classList.remove('bg-green')
            boundBtn.classList.remove('bg-green')
            cursorBtn.classList.remove('bg-green')
            gizmoManager.rotationGizmoEnabled = false
            gizmoManager.scaleGizmoEnabled = false
            gizmoManager.boundingBoxGizmoEnabled = false
        } else {
            PositionBtn.classList.remove('bg-green')
        }
    })
    const rotateBtn = document.querySelector('#rotateBtn')
    rotateBtn.addEventListener('click', () => {
        gizmoManager.rotationGizmoEnabled = !gizmoManager.rotationGizmoEnabled
        if (gizmoManager.rotationGizmoEnabled) {
            rotateBtn.classList.add('bg-green')
            scaleBtn.classList.remove('bg-green')
            boundBtn.classList.remove('bg-green')
            PositionBtn.classList.remove('bg-green')
            cursorBtn.classList.remove('bg-green')

            gizmoManager.positionGizmoEnabled = false
            gizmoManager.scaleGizmoEnabled = false
            gizmoManager.boundingBoxGizmoEnabled = false
        } else {
            rotateBtn.classList.remove('bg-green')
        }

    })
    const scaleBtn = document.querySelector('#scaleBtn')
    scaleBtn.addEventListener('click', () => {
        gizmoManager.scaleGizmoEnabled = !gizmoManager.scaleGizmoEnabled
        if (gizmoManager.scaleGizmoEnabled) {
            scaleBtn.classList.add('bg-green')
            boundBtn.classList.remove('bg-green')
            rotateBtn.classList.remove('bg-green')
            PositionBtn.classList.remove('bg-green')
            cursorBtn.classList.remove('bg-green')

            gizmoManager.positionGizmoEnabled = false
            gizmoManager.boundingBoxGizmoEnabled = false
            gizmoManager.rotationGizmoEnabled = false
        } else {
            scaleBtn.classList.remove('bg-green')

        }

    })
    const boundBtn = document.querySelector('#boundBtn')
    boundBtn.addEventListener('click', () => {
        gizmoManager.boundingBoxGizmoEnabled = !gizmoManager.boundingBoxGizmoEnabled
        if (gizmoManager.boundingBoxGizmoEnabled) {
            boundBtn.classList.add('bg-green')
            scaleBtn.classList.remove('bg-green')
            rotateBtn.classList.remove('bg-green')
            PositionBtn.classList.remove('bg-green')
            cursorBtn.classList.remove('bg-green')
            gizmoManager.positionGizmoEnabled = false
            gizmoManager.rotationGizmoEnabled = false
            gizmoManager.scaleGizmoEnabled = false
        } else {
            boundBtn.classList.remove('bg-green')
        }
    })
    const cursorBtn = document.querySelector('#cursorBtn')
    cursorBtn.addEventListener('click', () => {
        cursorBtn.classList.add('bg-green')
        gizmoManager.boundingBoxGizmoEnabled = false
        gizmoManager.scaleGizmoEnabled = false
        gizmoManager.rotationGizmoEnabled = false
        gizmoManager.positionGizmoEnabled = false
        rotateBtn.classList.remove('bg-green')
        scaleBtn.classList.remove('bg-green')
        boundBtn.classList.remove('bg-green')
        PositionBtn.classList.remove('bg-green')
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
                500
            )
        )
        .then(
            new InterpolateValueAction(
                ActionManager.OnPickTrigger,
                light,
                'diffuse',
                new Color3(1, 0, 1),
                500,
            )
        )
    platform.actionManager = new ActionManager(scene)
    platform.actionManager
        .registerAction(
            new ExecuteCodeAction(
                ActionManager.OnPickTrigger,
                function () {
                    scene.clearColor = new Color3(0.4, 0.2, 0.2)
                }
            )
        )
        .then(
            new ExecuteCodeAction(
                ActionManager.OnDoublePickTrigger,
                function () {
                    scene.clearColor = new Color3(0.1, 0.3, 0.3)
                }
            )
        )
    scene.actionManager = new ActionManager(scene)
    scene.actionManager
        .registerAction(
            new ExecuteCodeAction(
                ActionManager.OnDoublePickTrigger,
                function () {
                    gizmoManager.boundingBoxGizmoEnabled = !gizmoManager.boundingBoxGizmoEnabled
                }
            )
        )
}
export {createScene};



