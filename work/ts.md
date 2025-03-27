---
outline: [2,6]
---
# TypeScript <Badge type="warning" text="熟练" />

`“技术分享章节的所有内容，均源自作者个人的学习心得与整理。在此，诚挚地邀请各位读者审阅，若您发现其中有任何错误或不足之处，敬请不吝赐教，及时指出，以便不断修正和完善。”`

TypeScript（简称TS）是由微软开发的开源编程语言，它是JavaScript的超集，引入了类型系统，增强了静态类型检查能力。

# TypeScript 深度解析：现代JavaScript的超集

## 一、TypeScript概述

TypeScript是微软开发的开源编程语言，它是JavaScript的一个超集，添加了可选的静态类型系统。自2012年发布以来，TypeScript已成为大型前端项目的首选语言。

### 核心价值
- **类型安全**：编译时类型检查
- **更好的工具支持**：智能提示、代码导航
- **渐进式采用**：允许混合JavaScript代码
- **现代JavaScript特性**：支持ES6+所有特性
- **强大的生态系统**：与主流框架深度集成

## 二、类型系统基础

### 1. 基本类型注解

```typescript
// 原始类型
let isDone: boolean = false;
let count: number = 42;
let name: string = "TypeScript";

// 数组
let list: number[] = [1, 2, 3];
let genericList: Array<number> = [1, 2, 3]; // 泛型语法

// 元组
let tuple: [string, number] = ["hello", 10];

// 枚举
enum Color { Red = 1, Green, Blue }
let c: Color = Color.Green;

// 任意类型
let notSure: any = 4;
notSure = "maybe a string instead";

// 空值
let unusable: void = undefined;
let nullable: null = null;
```

### 2. 接口与类型别名

```typescript
// 接口定义
interface User {
  id: number;
  name: string;
  age?: number; // 可选属性
  readonly registerDate: Date; // 只读属性
  [propName: string]: any; // 索引签名
}

// 类型别名
type Point = {
  x: number;
  y: number;
};

// 函数类型
interface SearchFunc {
  (source: string, subString: string): boolean;
}

// 类类型
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date): void;
}

// 继承接口
interface Admin extends User {
  privileges: string[];
}

// 实现接口
class Clock implements ClockInterface {
  currentTime: Date = new Date();
  setTime(d: Date) {
    this.currentTime = d;
  }
}
```

## 三、高级类型特性

### 1. 泛型编程

```typescript
// 泛型函数
function identity<T>(arg: T): T {
  return arg;
}

// 泛型接口
interface GenericIdentityFn<T> {
  (arg: T): T;
}

// 泛型类
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

// 泛型约束
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

// 使用keyof
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

// 条件类型
type NonNullable<T> = T extends null | undefined ? never : T;
```

### 2. 实用类型工具

```typescript
// 内置工具类型示例
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

// Partial - 所有属性变为可选
type PartialTodo = Partial<Todo>;

// Readonly - 所有属性变为只读
type ReadonlyTodo = Readonly<Todo>;

// Pick - 选择部分属性
type TodoPreview = Pick<Todo, "title" | "completed">;

// Omit - 忽略部分属性
type TodoInfo = Omit<Todo, "completed">;

// Record - 构建键值类型
type PageInfo = Record<"home" | "about" | "contact", { title: string }>;

// 自定义工具类型
type Nullable<T> = T | null;
type Stringify<T> = { [K in keyof T]: string };
type Proxy<T> = {
  get(): T;
  set(value: T): void;
};
```

## 四、函数与类

### 1. 函数类型详解

```typescript
// 函数类型表达式
type GreetFunction = (name: string) => string;

// 可选参数与默认参数
function buildName(firstName: string, lastName?: string, title = "Mr.") {
  return `${title} ${firstName} ${lastName || ""}`;
}

// 剩余参数
function sum(...numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}

// 函数重载
function padLeft(value: string, padding: number | string): string {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  return padding + value;
}

// this类型
interface Card {
  suit: string;
  card: number;
}

interface Deck {
  suits: string[];
  cards: number[];
  createCardPicker(this: Deck): () => Card;
}

// 泛型函数
function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}
```

### 2. 类的高级特性

```typescript
// 基础类
class Animal {
  protected name: string;
  
  constructor(name: string) {
    this.name = name;
  }
  
  move(distance: number = 0) {
    console.log(`${this.name} moved ${distance}m`);
  }
}

// 继承
class Dog extends Animal {
  private age: number;
  static species = "Canis lupus familiaris";
  
  constructor(name: string, age: number) {
    super(name);
    this.age = age;
  }
  
  bark() {
    console.log("Woof! Woof!");
  }
  
  override move(distance = 5) {
    super.move(distance);
  }
  
  // 存取器
  get dogYears(): number {
    return this.age * 7;
  }
  
  set dogYears(value: number) {
    this.age = value / 7;
  }
}

// 抽象类
abstract class Department {
  constructor(public name: string) {}
  
  abstract printMeeting(): void;
  
  printName(): void {
    console.log("Department name: " + this.name);
  }
}

// 实现接口
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date): void;
}

class Clock implements ClockInterface {
  currentTime: Date = new Date();
  setTime(d: Date) {
    this.currentTime = d;
  }
}

// 类类型
class Greeter {
  static standardGreeting = "Hello, there";
  greeting: string;
  
  constructor(message?: string) {
    this.greeting = message || Greeter.standardGreeting;
  }
  
  greet() {
    return "Hello, " + this.greeting;
  }
}

let greeterMaker: typeof Greeter = Greeter;
greeterMaker.standardGreeting = "Hey there!";
let greeter2: Greeter = new greeterMaker();
```

## 五、模块与命名空间

### 1. 现代模块系统

```typescript
// math.ts - 模块导出
export function sum(a: number, b: number): number {
  return a + b;
}

export const PI = 3.1416;

export interface Circle {
  radius: number;
  area(): number;
}

// 默认导出
export default class Calculator {
  // ...
}

// app.ts - 模块导入
import Calculator, { sum as add, PI, Circle } from "./math";

const calc = new Calculator();
console.log(add(2, 3));

// 动态导入
async function loadMath() {
  const math = await import("./math");
  console.log(math.sum(5, 5));
}
```

### 2. 命名空间组织代码

```typescript
// Validation.ts
namespace Validation {
  export interface StringValidator {
    isAcceptable(s: string): boolean;
  }

  const lettersRegexp = /^[A-Za-z]+$/;
  const numberRegexp = /^[0-9]+$/;

  export class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string) {
      return lettersRegexp.test(s);
    }
  }

  export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
      return s.length === 5 && numberRegexp.test(s);
    }
  }
}

// 使用命名空间
let validators: { [s: string]: Validation.StringValidator } = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();

// 多文件命名空间
// 使用三斜线指令引用
/// <reference path="Validation.ts" />
/// <reference path="LettersOnlyValidator.ts" />
/// <reference path="ZipCodeValidator.ts" />
```

## 六、配置与工具链

### 1. tsconfig.json详解

```json
{
  "compilerOptions": {
    "target": "es2020",                  // 编译目标ES版本
    "module": "commonjs",                // 模块系统
    "strict": true,                      // 启用所有严格检查
    "esModuleInterop": true,             // 改进CommonJS/ES模块互操作
    "skipLibCheck": true,                // 跳过声明文件类型检查
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",                  // 输出目录
    "rootDir": "./src",                  // 源文件目录
    "baseUrl": ".",                      // 模块解析基础路径
    "paths": {                           // 路径映射
      "@utils/*": ["src/utils/*"]
    },
    "typeRoots": [                       // 类型声明文件位置
      "./node_modules/@types",
      "./typings"
    ],
    "allowJs": true,                     // 允许编译JS文件
    "checkJs": true,                     // 检查JS文件类型
    "declaration": true,                 // 生成声明文件
    "sourceMap": true,                   // 生成sourcemap
    "jsx": "react",                      // JSX处理方式
    "experimentalDecorators": true,       // 启用装饰器
    "emitDecoratorMetadata": true
  },
  "include": ["src/**/*"],               // 包含文件
  "exclude": ["node_modules", "**/*.spec.ts"] // 排除文件
}
```

### 2. 与构建工具集成

#### Webpack配置示例：

```javascript
// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@utils': path.resolve(__dirname, 'src/utils/'),
    },
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

#### Babel配置示例：

```json
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-typescript",
    "@babel/preset-react"
  ],
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread"
  ]
}
```

## 七、类型声明与第三方库

### 1. 声明文件(.d.ts)

```typescript
// 全局变量声明
declare const VERSION: string;

// 全局函数声明
declare function greet(name: string): void;

// 类型声明
declare type User = {
  id: number;
  name: string;
};

// 模块声明
declare module "*.css" {
  const classes: { [key: string]: string };
  export default classes;
}

// 命名空间声明
declare namespace MyLib {
  function makeGreeting(s: string): string;
  let numberOfGreetings: number;
}

// 扩展已有声明
declare global {
  interface Window {
    myAppConfig: {
      apiUrl: string;
    };
  }
}
```

### 2. 使用DefinitelyTyped

```bash
# 安装类型声明
npm install --save-dev @types/lodash @types/react
```

```typescript
// 使用类型声明
import _ from "lodash";
import React from "react";

interface Props {
  name: string;
}

const Hello: React.FC<Props> = ({ name }) => {
  const random = _.random(0, 100);
  return <div>Hello {name}! Random: {random}</div>;
};
```

## 八、最佳实践与模式

### 1. 类型安全模式

```typescript
// 可辨识联合
type NetworkLoadingState = {
  state: "loading";
};

type NetworkFailedState = {
  state: "failed";
  code: number;
};

type NetworkSuccessState = {
  state: "success";
  response: {
    title: string;
    duration: number;
    summary: string;
  };
};

type NetworkState = 
  | NetworkLoadingState
  | NetworkFailedState
  | NetworkSuccessState;

function logger(state: NetworkState): string {
  switch (state.state) {
    case "loading":
      return "Downloading...";
    case "failed":
      return `Error ${state.code} downloading`;
    case "success":
      return `Downloaded ${state.response.title}`;
  }
}

// 类型守卫
function isString(test: any): test is string {
  return typeof test === "string";
}

// 映射类型
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

// 模板字面量类型
type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";

type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
```

### 2. 工程化实践

```typescript
// 领域驱动设计示例
namespace Domain {
  // 值对象
  export class Address {
    constructor(
      public readonly street: string,
      public readonly city: string,
      public readonly zipCode: string
    ) {}
  }

  // 实体
  export class User {
    private _id: string;
    private _name: string;
    private _address: Address;

    constructor(id: string, name: string, address: Address) {
      this._id = id;
      this._name = name;
      this._address = address;
    }

    get id(): string {
      return this._id;
    }

    changeName(newName: string): void {
      if (newName.length < 2) {
        throw new Error("Name too short");
      }
      this._name = newName;
    }
  }

  // 仓库接口
  export interface UserRepository {
    findById(id: string): Promise<User | undefined>;
    save(user: User): Promise<void>;
  }

  // 服务
  export class UserService {
    constructor(private userRepository: UserRepository) {}

    async updateUserName(userId: string, newName: string): Promise<void> {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      user.changeName(newName);
      await this.userRepository.save(user);
    }
  }
}

// 依赖注入
class Container {
  private instances = new Map();

  register<T>(key: string, instance: T): void {
    this.instances.set(key, instance);
  }

  resolve<T>(key: string): T {
    const instance = this.instances.get(key);
    if (!instance) {
      throw new Error(`No instance registered for ${key}`);
    }
    return instance;
  }
}

// 配置容器
const container = new Container();
container.register("UserRepository", new DatabaseUserRepository());
container.register("UserService", new Domain.UserService(
  container.resolve("UserRepository")
));
```

## 九、TypeScript 5.0+新特性

### 1. 装饰器标准实现

```typescript
// 类装饰器
function logged(constructor: Function) {
  console.log(`Creating instance of ${constructor.name}`);
}

// 方法装饰器
function measure(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = function(...args: any[]) {
    const start = performance.now();
    const result = originalMethod.apply(this, args);
    const end = performance.now();
    console.log(`Call to ${propertyKey} took ${(end - start).toFixed(2)}ms`);
    return result;
  };
  
  return descriptor;
}

@logged
class Calculator {
  @measure
  add(a: number, b: number): number {
    let sum = 0;
    // 模拟耗时操作
    for (let i = 0; i < 1000000000; i++) {
      sum += a + b;
    }
    return sum;
  }
}
```

### 2. const类型参数

```typescript
// 类型参数推断为字面量类型
function getValue<T>(value: T): T {
  return value;
}

// 推断为string类型
const str = getValue("hello");

// 推断为"hello"字面量类型
const constStr = getValue("hello" as const);

// 新的satisfies操作符
type Colors = "red" | "green" | "blue";
const myColors = {
  primary: "red",
  secondary: "green",
  accent: "blue"
} satisfies Record<string, Colors>;
```

## 十、学习资源与社区

1. **官方资源**：
   - [TypeScript官方文档](https://www.typescriptlang.org/docs/)
   - [TypeScript Playground](https://www.typescriptlang.org/play)

2. **推荐书籍**：
   - 《Effective TypeScript》Dan Vanderkam
   - 《Programming TypeScript》Boris Cherny

3. **进阶学习**：
   - TypeScript类型体操：type-challenges
   - DefinitelyTyped源码学习

4. **社区**：
   - GitHub TypeScript仓库
   - Stack Overflow TypeScript标签
   - TypeScript官方Discord

TypeScript通过其强大的类型系统为JavaScript带来了企业级的开发体验，同时保持了JavaScript的灵活性。随着TypeScript的持续演进，它正在成为现代Web开发不可或缺的工具。无论是小型项目还是大型应用，TypeScript都能显著提高代码质量和开发效率。掌握TypeScript不仅意味着学习一门语言，更是拥抱一种更可靠、更可维护的编程范式。

## 十一、推荐视频教程
<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=800627522&bvid=BV1Xy4y1v7S2&cid=267200731&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="width: 100%; height: 450px; max-width: 100%;"></iframe>