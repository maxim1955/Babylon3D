/*
-------------------------------------- import -----------------------------------
*/
import {
    Sprite,
    SpriteManager,
    ActionManager,
    ArcRotateCamera,
    Color3,
    CubeTexture,
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
    --------------------------------------------SPRITES --------------------------------
    */
    const spriteManagerTrees = new SpriteManager("treesManager", 'https://3docean.img.customer.envatousercontent.com/files/288048468/palm_tree_preview.jpg?auto=compress%2Cformat&fit=crop&crop=top&w=590&h=590&s=aab9425b0d484d5199a97ad750417317', 2000, {
        width: 512,
        height: 1024
    });
    const tree = new Sprite("tree", spriteManagerTrees);
    tree.position.x = 10;
    tree.width = 1;
    tree.height = 2;

    /*
    ---------------------------------------- SKY BOX -----------------------------------
    */
    const envTexture = new CubeTexture("https://assets.babylonjs.com/environments/environmentSpecular.env", scene);
    scene.createDefaultSkybox(envTexture, true, 10000);
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
    QubeMaterial.emissiveTexture = new Texture(
        'https://avatars.mds.yandex.net/i?id=c30e9794de6f15e218c3329477afd50684a4e323-8482868-images-thumbs&n=13'
    )
    qube.position.y = 1.5
    /*
    * ---------------------------------------CREATE OBJECTS SECTION -------------------------------
    */

    /*
    -------------- SPHERE--------------------------------------------------------------------------
    */
    const createSpehere = () => {
        const sphere = MeshBuilder.CreateSphere('spheres', {
            diameter: 1,
        }, scene)
        sphere.position.y = 4;
        const SphereMaterial = new StandardMaterial("material", scene);
        sphere.material = SphereMaterial
        SphereMaterial.emissiveTexture = new Texture('data:image/jpeg;base64,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')
        sphere.actionManager = new ActionManager(scene);
        sphere.actionManager.registerAction(
            new ExecuteCodeAction(
                ActionManager.OnDoublePickTrigger,
                function () {
                    scene.removeMesh(sphere)
                }
            )
        )
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
        const QubeMaterial = new StandardMaterial("material", scene);
        qube.material = QubeMaterial
        QubeMaterial.emissiveTexture = new Texture('data:image/jpeg;base64,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')
        qube.actionManager = new ActionManager(scene);
        qube.actionManager.registerAction(
            new ExecuteCodeAction(
                ActionManager.OnDoublePickTrigger,
                function () {
                    scene.removeMesh(qube)
                }
            )
        )
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
                    scene.removeMesh('sphere', true)
                }
            )
        )

};
export {createScene};



