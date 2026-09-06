---
outline: [2,6]
---
# Three.js <Badge type="warning" text="熟练" />

`“技术分享章节的所有内容，均源自作者个人的学习心得与整理。在此，诚挚地邀请各位读者审阅，若您发现其中有任何错误或不足之处，敬请不吝赐教，及时指出，以便不断修正和完善。”`

Three.js是一个基于WebGL的JavaScript库，它允许开发者在浏览器中创建和显示动画3D图形。

### 一、Three.js的基本概念

1. **场景（Scene）**：场景是一个三维的世界，在这个世界中可以放置各种各样的物体。它是所有物体的容器，也对应着创建的三维世界，允许设置哪些对象被Three.js渲染以及渲染在哪里。
2. **相机（Camera）**：相机是三维空间的观察者，通过相机来查看场景。它指定了在什么位置观察这个三维场景，以及以什么样的角度进行观察。Three.js提供了多种相机，如透视相机（PerspectiveCamera）和正交投影相机（OrthographicCamera）等。
3. **渲染器（Renderer）**：渲染器用于将绘制好的元素进行渲染，最终呈现在浏览器上。Three.js主要使用WebGL渲染器（WebGLRenderer）来进行渲染。
4. **物体（Object）**：物体是被观察的对象，不同的物体形状、大小、材质、纹理不同。在Three.js中，可以通过几何体（Geometry）和材质（Material）来创建一个物体。
5. **光源（Light）**：光源会影响物体表面的明暗效果，为了更好地模拟三维效果，需要添加一些光照和阴影。

### 二、Three.js的基本使用步骤

1. **创建场景**：使用`new THREE.Scene()`来创建一个场景实例。
2. **添加物体**：创建几何体和材质，并使用它们来创建一个网格模型（Mesh），然后将网格模型添加到场景中。例如，可以创建一个长方体几何对象和一个基础网孔材料，然后将它们组合成一个网格模型，并添加到场景中。
3. **设置相机**：根据需求选择合适的相机，并设置相机的位置和观察目标。例如，可以使用透视投影相机，并设置其视野角度、长宽比、近端面和远端面等参数。
4. **创建渲染器**：使用`new THREE.WebGLRenderer()`来创建一个渲染器实例，并设置渲染器的尺寸和背景颜色等参数。然后，将渲染器的domElement添加到HTML文档中。
5. **渲染循环**：使用`requestAnimationFrame`方法来创建一个渲染循环，以便在每次浏览器重绘时都更新和渲染场景。在渲染循环中，调用渲染器的`render`方法，将场景和相机作为参数传递给它。

### 三、Three.js的进阶使用

1. **纹理贴图**：可以使用纹理贴图来为物体添加更丰富的外观。使用`THREE.TextureLoader().load()`方法来加载纹理图像，并将其应用到材质上。
2. **动画**：可以通过改变物体的属性（如位置、旋转、缩放等）来创建动画效果。可以使用`requestAnimationFrame`方法来不断更新物体的属性，从而实现动画。
3. **鼠标交互**：可以使用射线拾取（Raycasting）来实现鼠标与物体的交互。通过创建一个射线拾取器（Raycaster）和一个鼠标向量（Vector2），并在鼠标移动时更新鼠标向量的值，然后使用射线拾取器来检测鼠标与哪些物体相交。
4. **粒子系统**：可以使用粒子系统来创建粒子效果，如烟雾、火焰、星空等。通过创建一个粒子几何体和一个粒子材质，并将它们组合成一个粒子系统来实现。
5. **物理引擎**：可以使用物理引擎（如Cannon.js）来创建物理模拟效果，如碰撞、重力等。将Three.js中的物体与物理引擎中的刚体进行关联，并设置相应的物理属性来实现。

### 核心优势：
- **跨平台**：基于Web标准，无需插件
- **高性能**：利用WebGL硬件加速
- **易用性**：简化WebGL的复杂API
- **丰富功能**：内置几何体、材质、光源、相机等
- **活跃社区**：大量示例和扩展库

## 四、核心概念与架构

### 1. 基础场景构成

```javascript
// 经典Three.js场景结构
const scene = new THREE.Scene();  // 场景容器
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000); // 观察视角
const renderer = new THREE.WebGLRenderer(); // 渲染引擎
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建一个立方体
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// 渲染循环
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
```

### 2. 核心对象关系

```
Scene
├─ Camera
│   ├─ PerspectiveCamera
│   └─ OrthographicCamera
├─ Objects
│   ├─ Mesh (Geometry + Material)
│   ├─ Light
│   └─ Group
└─ Renderer
    └─ WebGLRenderer
```

## 五、几何体与材质实战

### 1. 几何体创建

```javascript
// 复杂几何体组合示例
const createCustomShape = () => {
  const group = new THREE.Group();
  
  // 基础立方体
  const boxGeo = new THREE.BoxGeometry(1, 1, 1);
  const boxMat = new THREE.MeshStandardMaterial({ 
    color: 0xff0000,
    roughness: 0.4
  });
  const box = new THREE.Mesh(boxGeo, boxMat);
  box.position.set(0, 0.5, 0);
  
  // 圆柱体
  const cylinderGeo = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
  const cylinderMat = new THREE.MeshStandardMaterial({
    color: 0x00ff00,
    metalness: 0.7
  });
  const cylinder = new THREE.Mesh(cylinderGeo, cylinderMat);
  cylinder.position.set(2, 0, 0);
  
  // 文字几何体（需要加载字体）
  const loader = new THREE.FontLoader();
  loader.load('fonts/helvetiker_regular.typeface.json', (font) => {
    const textGeo = new THREE.TextGeometry('3D', {
      font: font,
      size: 0.5,
      height: 0.2,
      curveSegments: 12
    });
    const textMat = new THREE.MeshPhongMaterial({ color: 0x0000ff });
    const text = new THREE.Mesh(textGeo, textMat);
    text.position.set(-2, 0, 0);
    group.add(text);
  });
  
  group.add(box);
  group.add(cylinder);
  
  return group;
};

const customShape = createCustomShape();
scene.add(customShape);
```

### 2. 高级材质应用

```javascript
// PBR材质示例
const createPBRMaterial = () => {
  const textureLoader = new THREE.TextureLoader();
  
  // 加载纹理贴图
  const albedoMap = textureLoader.load('textures/metal/albedo.jpg');
  const normalMap = textureLoader.load('textures/metal/normal.jpg');
  const roughnessMap = textureLoader.load('textures/metal/roughness.jpg');
  const aoMap = textureLoader.load('textures/metal/ao.jpg');
  
  const material = new THREE.MeshStandardMaterial({
    map: albedoMap,
    normalMap: normalMap,
    roughnessMap: roughnessMap,
    aoMap: aoMap,
    metalness: 0.9,
    roughness: 0.1
  });
  
  return material;
};

// 环境贴图
const envLoader = new THREE.CubeTextureLoader();
const envMap = envLoader.load([
  'textures/env/px.jpg', 'textures/env/nx.jpg',
  'textures/env/py.jpg', 'textures/env/ny.jpg',
  'textures/env/pz.jpg', 'textures/env/nz.jpg'
]);
scene.environment = envMap;
scene.background = envMap;

// 创建PBR球体
const sphereGeo = new THREE.SphereGeometry(1, 32, 32);
const pbrMaterial = createPBRMaterial();
const sphere = new THREE.Mesh(sphereGeo, pbrMaterial);
scene.add(sphere);
```

## 六、光照与阴影

### 1. 光源类型组合

```javascript
// 综合光照场景
function setupLights() {
  // 环境光（基础照明）
  const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
  scene.add(ambientLight);
  
  // 平行光（太阳光）
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 10, 7);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  scene.add(directionalLight);
  
  // 点光源（灯泡效果）
  const pointLight = new THREE.PointLight(0xff8800, 2, 10);
  pointLight.position.set(0, 3, 0);
  pointLight.castShadow = true;
  scene.add(pointLight);
  
  // 聚光灯（舞台灯效果）
  const spotLight = new THREE.SpotLight(0x00ff00, 1, 20, Math.PI/6);
  spotLight.position.set(-5, 5, 0);
  spotLight.target.position.set(0, 0, 0);
  spotLight.castShadow = true;
  scene.add(spotLight);
  scene.add(spotLight.target);
  
  // 光晕效果
  const lightHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
  scene.add(lightHelper);
  
  return { directionalLight, pointLight, spotLight };
}

// 启用阴影
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// 创建带阴影的物体
const groundGeometry = new THREE.PlaneGeometry(20, 20);
const groundMaterial = new THREE.MeshStandardMaterial({ 
  color: 0xcccccc,
  roughness: 0.8
});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

const lights = setupLights();
```

## 七、动画与交互

### 1. 复杂动画系统

```javascript
// GSAP动画示例
import gsap from 'gsap';

const animateWithGSAP = () => {
  const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ color: 0xff0000 })
  );
  scene.add(box);
  
  // 创建动画时间线
  const tl = gsap.timeline({ repeat: -1, yoyo: true });
  
  tl.to(box.position, { 
    x: 3, 
    duration: 1,
    ease: "power2.inOut"
  })
  .to(box.rotation, {
    y: Math.PI * 2,
    duration: 2,
    ease: "elastic.out(1, 0.5)"
  }, 0)
  .to(box.scale, {
    x: 2, y: 0.5, z: 2,
    duration: 1.5,
    ease: "bounce.out"
  }, 0.5);
  
  return box;
};

// 物理动画
import * as CANNON from 'cannon-es';

const physicsAnimation = () => {
  // 物理世界
  const world = new CANNON.World({
    gravity: new CANNON.Vec3(0, -9.82, 0)
  });
  
  // 创建物理物体
  const sphereShape = new CANNON.Sphere(1);
  const sphereBody = new CANNON.Body({
    mass: 5,
    shape: sphereShape,
    position: new CANNON.Vec3(0, 10, 0)
  });
  world.addBody(sphereBody);
  
  // 创建Three.js对应物体
  const sphereMesh = new THREE.Mesh(
    new THREE.SphereGeometry(1),
    new THREE.MeshStandardMaterial({ color: 0xffff00 })
  );
  scene.add(sphereMesh);
  
  // 地面物理体
  const groundShape = new CANNON.Plane();
  const groundBody = new CANNON.Body({
    mass: 0,
    shape: groundShape
  });
  groundBody.quaternion.setFromAxisAngle(
    new CANNON.Vec3(1, 0, 0), -Math.PI/2
  );
  world.addBody(groundBody);
  
  // 同步物理和渲染
  const timeStep = 1/60;
  function physicsLoop() {
    world.step(timeStep);
    sphereMesh.position.copy(sphereBody.position);
    sphereMesh.quaternion.copy(sphereBody.quaternion);
  }
  
  return physicsLoop;
};

const animatedBox = animateWithGSAP();
const physicsUpdate = physicsAnimation();

// 主动画循环
function animate() {
  requestAnimationFrame(animate);
  physicsUpdate();
  renderer.render(scene, camera);
}
animate();
```

### 2. 交互控制

```javascript
// 轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// 鼠标交互
const handleInteraction = () => {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  
  function onMouseClick(event) {
    // 计算鼠标位置归一化坐标
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // 更新射线
    raycaster.setFromCamera(mouse, camera);
    
    // 检测相交物体
    const intersects = raycaster.intersectObjects(scene.children, true);
    
    if (intersects.length > 0) {
      const clickedObject = intersects[0].object;
      
      // 点击动画
      gsap.to(clickedObject.scale, {
        x: 1.5, y: 1.5, z: 1.5,
        duration: 0.3,
        yoyo: true,
        repeat: 1
      });
      
      // 改变材质
      if (clickedObject.material) {
        clickedObject.material.color.setHex(Math.random() * 0xffffff);
      }
    }
  }
  
  window.addEventListener('click', onMouseClick, false);
  
  // 悬停效果
  let hoveredObject = null;
  const originalMaterials = new WeakMap();
  
  function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    
    // 恢复上一个悬停物体的材质
    if (hoveredObject) {
      hoveredObject.material = originalMaterials.get(hoveredObject);
      hoveredObject = null;
    }
    
    // 设置新悬停物体的高亮材质
    if (intersects.length > 0) {
      hoveredObject = intersects[0].object;
      originalMaterials.set(hoveredObject, hoveredObject.material);
      
      const highlightMaterial = new THREE.MeshBasicMaterial({
        color: 0xffff00,
        wireframe: true
      });
      hoveredObject.material = highlightMaterial;
    }
  }
  
  window.addEventListener('mousemove', onMouseMove, false);
};

handleInteraction();
```

## 八、性能优化技巧

### 1. 实例化渲染

```javascript
// 实例化网格 - 高效渲染大量相似物体
const instanceCount = 1000;
const geometry = new THREE.InstancedBufferGeometry();

// 基础几何体（立方体）
const baseGeometry = new THREE.BoxGeometry(1, 1, 1);
geometry.index = baseGeometry.index;
geometry.attributes.position = baseGeometry.attributes.position;
geometry.attributes.normal = baseGeometry.attributes.normal;
geometry.attributes.uv = baseGeometry.attributes.uv;

// 实例化属性
const offsets = new Float32Array(instanceCount * 3);
const colors = new Float32Array(instanceCount * 3);
const scales = new Float32Array(instanceCount);

for (let i = 0; i < instanceCount; i++) {
  // 随机位置
  offsets[i * 3] = (Math.random() - 0.5) * 100;
  offsets[i * 3 + 1] = (Math.random() - 0.5) * 100;
  offsets[i * 3 + 2] = (Math.random() - 0.5) * 100;
  
  // 随机颜色
  colors[i * 3] = Math.random();
  colors[i * 3 + 1] = Math.random();
  colors[i * 3 + 2] = Math.random();
  
  // 随机大小
  scales[i] = Math.random() * 2 + 0.5;
}

geometry.setAttribute('offset', new THREE.InstancedBufferAttribute(offsets, 3));
geometry.setAttribute('color', new THREE.InstancedBufferAttribute(colors, 3));
geometry.setAttribute('scale', new THREE.InstancedBufferAttribute(scales, 1));

// 着色器材质
const material = new THREE.RawShaderMaterial({
  uniforms: {
    time: { value: 0 }
  },
  vertexShader: `
    precision highp float;
    
    attribute vec3 position;
    attribute vec3 normal;
    attribute vec2 uv;
    
    attribute vec3 offset;
    attribute vec3 color;
    attribute float scale;
    
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    uniform mat3 normalMatrix;
    uniform float time;
    
    varying vec3 vColor;
    varying vec2 vUv;
    
    void main() {
      vColor = color;
      vUv = uv;
      
      vec3 pos = position * scale + offset;
      pos.y += sin(time + offset.x) * 2.0;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    precision highp float;
    
    varying vec3 vColor;
    varying vec2 vUv;
    
    void main() {
      gl_FragColor = vec4(vColor, 1.0);
    }
  `
});

const mesh = new THREE.InstancedMesh(geometry, material, instanceCount);
scene.add(mesh);

// 动画中更新uniform
function animate() {
  requestAnimationFrame(animate);
  material.uniforms.time.value += 0.01;
  renderer.render(scene, camera);
}
animate();
```

### 2. 后期处理效果

```javascript
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass';

// 创建后期处理通道
const createPostProcessing = () => {
  const composer = new EffectComposer(renderer);
  
  // 基础渲染通道
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);
  
  // 辉光效果
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5, 0.4, 0.85
  );
  bloomPass.threshold = 0;
  bloomPass.strength = 1.5;
  bloomPass.radius = 0.5;
  composer.addPass(bloomPass);
  
  // 抗锯齿
  if (renderer.getPixelRatio() === 1) {
    const smaaPass = new SMAAPass(
      window.innerWidth * renderer.getPixelRatio(),
      window.innerHeight * renderer.getPixelRatio()
    );
    composer.addPass(smaaPass);
  }
  
  return composer;
};

const composer = createPostProcessing();

// 修改动画循环
function animate() {
  requestAnimationFrame(animate);
  composer.render();
}
animate();
```

## 九、项目结构与最佳实践

### 1. 模块化项目结构

```
src/
├─ assets/            # 静态资源
│   ├─ models/        # 3D模型
│   ├─ textures/      # 纹理贴图
│   └─ fonts/         # 字体文件
├─ components/        # 可复用3D组件
│   ├─ lights.js      # 光照配置
│   ├─ floor.js       # 地面组件
│   └─ character.js   # 角色组件
├─ systems/           # 系统管理
│   ├─ animation.js   # 动画系统
│   ├─ physics.js     # 物理系统
│   └─ ui.js          # UI系统
├─ utils/             # 工具函数
│   ├─ helpers.js     # 场景辅助工具
│   └─ loader.js      # 资源加载器
├─ config.js          # 全局配置
└─ main.js            # 主入口文件
```

### 2. 资源管理与加载

```javascript
// 高级资源加载器
class ResourceManager {
  constructor() {
    this.textureLoader = new THREE.TextureLoader();
    this.gltfLoader = new GLTFLoader();
    this.cubeTextureLoader = new THREE.CubeTextureLoader();
    this.fontLoader = new THREE.FontLoader();
    
    this.assets = {
      textures: {},
      models: {},
      fonts: {},
      cubeTextures: {}
    };
    
    this.loadingManager = new THREE.LoadingManager(
      () => console.log('All assets loaded'),
      (url, loaded, total) => console.log(`Loading ${loaded}/${total}: ${url}`),
      (url) => console.error(`Error loading ${url}`)
    );
  }
  
  loadTexture(name, path) {
    return new Promise((resolve) => {
      this.textureLoader.load(path, (texture) => {
        this.assets.textures[name] = texture;
        resolve(texture);
      });
    });
  }
  
  loadModel(name, path) {
    return new Promise((resolve) => {
      this.gltfLoader.load(path, (gltf) => {
        this.assets.models[name] = gltf;
        resolve(gltf);
      });
    });
  }
  
  loadFont(name, path) {
    return new Promise((resolve) => {
      this.fontLoader.load(path, (font) => {
        this.assets.fonts[name] = font;
        resolve(font);
      });
    });
  }
  
  loadCubeTexture(name, paths) {
    return new Promise((resolve) => {
      this.cubeTextureLoader.load(paths, (texture) => {
        this.assets.cubeTextures[name] = texture;
        resolve(texture);
      });
    });
  }
  
  async loadAllAssets(manifest) {
    const texturePromises = manifest.textures.map(({name, path}) => 
      this.loadTexture(name, path));
    
    const modelPromises = manifest.models.map(({name, path}) =>
      this.loadModel(name, path));
    
    const fontPromises = manifest.fonts.map(({name, path}) =>
      this.loadFont(name, path));
    
    const cubeTexturePromises = manifest.cubeTextures.map(({name, paths}) =>
      this.loadCubeTexture(name, paths));
    
    await Promise.all([
      ...texturePromises,
      ...modelPromises,
      ...fontPromises,
      ...cubeTexturePromises
    ]);
  }
}

// 使用示例
const resources = new ResourceManager();
const manifest = {
  textures: [
    { name: 'metal_albedo', path: 'textures/metal/albedo.jpg' },
    { name: 'metal_normal', path: 'textures/metal/normal.jpg' }
  ],
  models: [
    { name: 'character', path: 'models/character.glb' }
  ],
  fonts: [
    { name: 'helvetiker', path: 'fonts/helvetiker_regular.typeface.json' }
  ],
  cubeTextures: [
    { 
      name: 'environment', 
      paths: [
        'textures/env/px.jpg', 'textures/env/nx.jpg',
        'textures/env/py.jpg', 'textures/env/ny.jpg',
        'textures/env/pz.jpg', 'textures/env/nz.jpg'
      ]
    }
  ]
};

resources.loadAllAssets(manifest).then(() => {
  // 所有资源加载完成后初始化场景
  initScene();
});
```

## 十、扩展与集成

### 1. 与React集成（react-three-fiber）

```jsx
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Box(props) {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta;
  });
  
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
      <Model url="/model.glb" />
      <OrbitControls />
    </Canvas>
  );
}
```

### 2. VR/AR集成

```javascript
// WebXR VR示例
import { VRButton } from 'three/examples/jsm/webxr/VRButton';

function initVR() {
  renderer.xr.enabled = true;
  document.body.appendChild(VRButton.createButton(renderer));
  
  // 控制器
  const controller1 = renderer.xr.getController(0);
  controller1.addEventListener('selectstart', () => {
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xff0000 })
    );
    controller1.attach(sphere);
    scene.add(sphere);
  });
  scene.add(controller1);
  
  // 手柄光标
  const controllerModelFactory = new XRControllerModelFactory();
  const controllerGrip1 = renderer.xr.getControllerGrip(0);
  controllerGrip1.add(controllerModelFactory.createControllerModel(controllerGrip1));
  scene.add(controllerGrip1);
  
  // 动画循环
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
}

// 检测XR支持
if ('xr' in navigator) {
  navigator.xr.isSessionSupported('immersive-vr')
    .then((supported) => {
      if (supported) {
        initVR();
      } else {
        console.warn('VR not supported');
      }
    });
}
```

## 十一、调试与性能分析

### 1. 调试工具

```javascript
// 添加调试UI
import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js';

const initDebugUI = () => {
  const gui = new GUI();
  
  // 相机控制
  const cameraFolder = gui.addFolder('Camera');
  cameraFolder.add(camera.position, 'x', -10, 10).name('Pos X');
  cameraFolder.add(camera.position, 'y', -10, 10).name('Pos Y');
  cameraFolder.add(camera.position, 'z', -10, 10).name('Pos Z');
  
  // 光照控制
  const lightFolder = gui.addFolder('Lights');
  lightFolder.add(ambientLight, 'intensity', 0, 2).name('Ambient');
  lightFolder.add(directionalLight, 'intensity', 0, 5).name('Directional');
  
  // 材质控制
  const materialFolder = gui.addFolder('Material');
  materialFolder.add(mesh.material, 'wireframe');
  materialFolder.addColor(mesh.material, 'color');
  
  // 动画控制
  const animationFolder = gui.addFolder('Animation');
  const animParams = {
    speed: 1,
    pause: false
  };
  animationFolder.add(animParams, 'speed', 0.1, 5).name('Speed');
  animationFolder.add(animParams, 'pause').name('Pause');
  
  return animParams;
};

const debugParams = initDebugUI();

// 修改动画循环
function animate() {
  if (!debugParams.pause) {
    mesh.rotation.y += 0.01 * debugParams.speed;
  }
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
```

### 2. 性能监控

```javascript
// 使用stats.js监控性能
import Stats from 'three/examples/jsm/libs/stats.module.js';

const initStats = () => {
  const stats = new Stats();
  stats.showPanel(0); // 0: fps, 1: ms, 2: mb
  document.body.appendChild(stats.dom);
  
  return stats;
};

const stats = initStats();

// 修改动画循环
function animate() {
  stats.begin();
  // 渲染代码...
  stats.end();
  requestAnimationFrame(animate);
}
```

## 十二、进阶学习资源

1. **官方资源**：
   - [Three.js官方文档](https://threejs.org/docs/)
   - [官方示例库](https://threejs.org/examples/)

2. **学习平台**：
   - Three.js Journey（付费高质量课程）
   - YouTube频道：SimonDev、Fireship

3. **扩展库**：
   - drei：React Three Fiber的实用工具集
   - cannon-es：物理引擎
   - postprocessing：后期处理效果

4. **模型资源**：
   - Sketchfab
   - TurboSquid
   - Clara.io

Three.js为Web 3D开发提供了无限可能，从简单的产品展示到复杂的游戏开发，从数据可视化到虚拟现实体验。通过掌握其核心概念并不断实践，开发者可以创造出令人惊叹的3D Web应用。随着WebGPU等新技术的发展，Three.js生态系统将继续演进，为Web 3D图形带来更强大的性能和更丰富的功能。

## 十三、推荐视频教程
<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=512623539&bvid=BV1Gg411X7FY&cid=1227776360&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="width: 100%; height: 450px; max-width: 100%;"></iframe>