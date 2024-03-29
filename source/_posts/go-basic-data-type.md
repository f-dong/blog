---
title: Go 语言的基本数据类型
date: 2022-09-27 22:21:03
keywords: golang,basic types,基本类型,数据类型,Go语言
summary:  Go语言中有丰富的数据类型，除了基本的整型、浮点型、布尔型、字符串外，还有数组、切片、结构体、函数、map、通道（channel）等。Go 语言的基本类型和其他语言大同小异。
description: Go语言内置布尔、字符串、整数、字节、Unicode、浮点、复数等基本类型。变量申明时没有显式赋初始值，则默认是“零”。
tags:
- GoLang
categories: GoLang
updated: 2023-02-13
---

数据类型的出现是为了用大数据需要存储不同的数据，编程的时候的时间才需要申请大的内存，可以利用内存。

Go语言中有丰富的数据类型，除了基本的整型、浮点型、布尔型、字符串外，还有数组、切片、结构体、函数、map、通道（channel）等。Go 语言的基本类型和其他语言大同小异。

## 布尔型 bool

Go 中以 `bool` 类型声明布尔型数据，布尔型的值只能是常量 `true` 或 `false` 

- 布尔型的变量默认值为 `false`
- 布尔型无法参与数值运算，也无法与其他类型互转

## 数值型

### 整数型

Go 的整型主要分为有符号和无符号两大类。按长度可以分为 `int8`、`int16`、`int32` 与 `int64`，对应的无符号整型分别为 `uint8`、`uint16`、`uint32` 与 `uint64`。

|   类型    |  符号  | 描述                                                         |
| :-------: | :----: | :----------------------------------------------------------- |
|  `uint8`  | 无符号 | 8位整型 (0 到 255)                                           |
| `uint16`  | 无符号 | 6位整型 (0 到 65535)                                         |
| `uint32`  | 无符号 | 32位整型 (0 到 4294967295)                                   |
| `uint64`  | 无符号 | 64位整型 (0 到 18446744073709551615)                         |
|  `int8`   | 有符号 | 8位整型 (-128 到 127)                                        |
|  `int16`  | 有符号 | 16位整型 (-32768 到 32767)                                   |
|  `int32`  | 有符号 | 32位整型 (-2147483648 到 2147483647)                         |
|  `int64`  | 有符号 | 64位整型 (-9223372036854775808 到 9223372036854775807)       |
|  `uint`   | 无符号 | **特殊** 在 32 位操作系统就是 `uint32`，64 位操作系统就是 `uint64`，但不能将 `uint` 赋值给 `uint32` 或 `uint64` |
|   `int`   | 有符号 | **特殊** 在 32 位操作系统就是 `int32`，64 位操作系统就是 `int64`，但不能将其赋值给 `int32` 或 `int64` 变量 |
| `uintptr` | 无符号 | 无符号整型，用于存放一个指针                                 |

#### 数字字面量语法（Number literals syntax）

在 Go 1.13 版本之后引入了数字字面量语法，这样便于开发者以二进制、八进制或十六进制浮点数的格式定义数字，例如：

`v := 0b00101101`， 代表二进制的 101101，相当于十进制的 45。 `v := 0o377`，代表八进制的 377，相当于十进制的 255。 `v := 0x1p-2`，代表十六进制的 1 除以 2²，也就是 0.25。

而且还允许我们用 `_` 来分隔数字，比如说： `v := 123_456` 表示 v 的值等于 123456。

我们可以借助 fmt 函数来将一个整数以不同进制形式展示。

```go
package main
 
import "fmt"
 
func main(){
	// 十进制
	var a int = 10
	fmt.Printf("%d \n", a)  // 10
	fmt.Printf("%b \n", a)  // 1010  占位符%b表示二进制
 
	// 八进制  以0开头
	var b int = 077
	fmt.Printf("%o \n", b)  // 77
 
	// 十六进制  以0x开头
	var c int = 0xff
	fmt.Printf("%x \n", c)  // ff
	fmt.Printf("%X \n", c)  // FF
}
```

### 浮点型

Go 语言支持两种浮点型数：`float32`和`float64`。这两种浮点型数据格式遵循 `IEEE 754` 标准： `float32` 的浮点数的最大范围约为 `3.4e38`，可以使用常量定义：`math.MaxFloat32`。 `float64` 的浮点数的最大范围约为 `1.8e308`，可以使用一个常量定义：`math.MaxFloat64`。

```go
package main

import (
        "fmt"
        "math"
)
func main() {
        fmt.Printf("%f\n", math.Pi)
        fmt.Printf("%.2f\n", math.Pi)
}
```

## 字符串

字符串就是移除固定长度的字符串拼接起来的字符序列，Go 的字符串是由单个字节链接起来的。Go 语言的字符串的字节使用 UTF-8 编码标识 Unicode 文本

### 单引号与双引号的区别

与 PHP 不同，在 Go 中，需要使用双引号来表示字符串（其实质是一个byte类型的数组），单引号则表示 rune 类型（UTF-8字符）

```go
fmt.Println("中国") // 中国
fmt.Println('中') // 20013 (UTF-8编码值)
```

### 转义字符

如果需要在字符串内添加特殊符号，就需要使用转义字符，Go 语言中常见的转义字符如下：

| 转义符 | 含义                               |
| ----- | --------------------------------- |
| `\r`   | 回车符（返回行首）                 |
| `\n`   | 换行符（直接跳到下一行的同列位置） |
| `\t`   | 制表符                             |
| `\'`   | 单引号                             |
| `\"`   | 双引号                             |
| `\\`   | 反斜杠                          |

### 定义多行字符串

在 Go 中，使用双引号定义字符串是最常见的方式，被称为字符串字面量[^1]，这种定义方式不能跨行，如果需要在代码中定义一个多行字符串时，就可以使用 ` 反引号，代码如下

反引号 `，是键盘上 ESC 键下边的键，两个反引号间的字符串将被原样赋值到 str 变量中。

```go
str := `
第一行
第二行

第四行
不会转义字符，会原样输出，例如这样\r\n
`
```

代码运行结果：

```go

第一行
第二行

第四行
不会转义字符，会原样输出，例如这样\r\n
```

## 数组 (Array)

Go 语言提供了数组类型的数据结构，Go 中的数组是顺序索引，固定数据类型且固定数据个数的序列，数组通过索引（位置）来读取或修改，索引从 0 开始，第一个元素的索引为 0，第二个索引为 1，第三个索引为 2，以此类推。数组的下边取值范围是从 0 开始，到长度减 1

数组一旦定义后，大小（长度）不能改变

### 声明数组

Go 语言声明数组需要指定长度以及数据类型，其语法格式如下：

```go
var variable_name [SIZE] variable_type
```

示例：

```go
var arr = [5]string{"张三", "李四", "王五", "李老六", "王二狗"}
fmt.Println(arr) // [张三 李四 王五 李老六 王二狗]
```

数组初始化中的 `{}` 中的元素个数不能大于 `[]` 中的数字

数组的其他创建方式：

```go
var arr [5]string // 等价于 var arr = [5]string{}
fmt.Println(arr) // [    ]

var b = [3]string{"张三", "李老六", "王二狗"}
fmt.Println(b) // [张三 李四 王二狗]

var c = [5]int{'A', 'B', 'C', 'D', '李'}
fmt.Println(c) // [65 66 67 68 26446]

d := [...]int{1, 2, 3, 4, 5} // 根据元素的个数，设置数组的大小
fmt.Println(d) // [1 2 3 4 5]

e := [5]int{4: 100, 3: 200} // 指定键，没有设置的键默认为对应类型的空值
fmt.Println(e) // [0 0 0 200 100]

f := [...]int{0: 1, 4: 2, 10: 100}
fmt.Println(f) // [1 0 0 0 2 0 0 0 0 0 100]
```

### 数组使用

#### 遍历数组

```go
package main

import "fmt"

func main() {
    a := [...]float64{67.7, 98.6, 26, 33}
    for i := 0; i < len(a); i++ {
        fmt.Printf("key: %d----val: %.2f\n", i, a[i])
    }
}
// key: 0----val: 67.70
// key: 1----val: 98.60
// key: 2----val: 26.00
// key: 3----val: 33.00
```

使用 range 遍历数组：

```go
package main

import "fmt"

func main() {
    a := [...]float64{67.7, 98.6, 26, 33}
    for i, v := range a {
        fmt.Printf("key: %d----val: %.2f\n", i, a[i])
    }
}
// key: 0----val: 67.70
// key: 1----val: 98.60
// key: 2----val: 26.00
// key: 3----val: 33.00
```

## 切片 (Slice)

Go 语言切片是对数组的抽象。

Go 数组的长度不可改变，在一些特定的需求下，这样的设定就不太适用，因此，Go 提供了一种灵活的内置类型：切片(Slice)，与数组相比，切片的长度是不固定的，可以随意追加元素，在追加时使切片容量增大。

切片是一种方便、灵活且强大的类型，切片本身没有任何数据，他们只是对现有数组的引用。切片与数组相比，不需要指定长度，从概念上来说切片像一个结构体，这个结构体包含了三个元素：

1. 指针：指向数组中切片指定的开始位置。
2. 长度：即切片的长度。
3. 最大长度，也就是切片开始位置到数组的最后位置的长度。

### 切片的语法

### 定义切片：

可以通过声明一个未指定长度的数组的方式

```go
var identifier []type
```

切片不需要说明长度，或者可使用 `make()` 函数来创建切片，`make()` 是 Go 的内置函数：

```go
var slice1 []type = make([]type, len)
// 也可以简写成
slice2 := make([]type, len)
```

#### 初始化

```go
slice := make([]int, 5)
slice[0] = 1
slice[1] = 2
slice[2] = 3
slice[3] = 4
fmt.Println(slice) // [1 2 3 4 0]

// -------------------------------
s := []int{1, 2, 3}
fmt.Println(s) // [1 2 3]
```

可以将数组中的元素创建为一个切片，切片内容为 `startIndex` 到 `endIndex-1`（不包含 `endIndex`）

```go
s := arr[startIndex, endIndex]

// ------------------------------
arr := [5]int{1, 2, 3, 4, 5}
s1 := arr[1:3]
fmt.Println(s) // [2 3 4]
```

#### 向切片中追加数据

如果想向切片中增加元素则需要使用 `append()` 函数，`append()` 是 Go 的内置函数，如果超出初始化时的最大容量，Go 会将原切片内容（底层数组）拷贝，并重新创建原数组两倍长度的新数组，将拷贝的内容填充至新的底层数组

```go
s := make([]int, 3)
s[0] = 1
s[1] = 2
s[2] = 3
s = append(s, 4, 5)
fmt.Println(s) // [1 2 3 4 5]
```

## 集合 (Map)

map 是 Go 中的内置类型，他将一个值与一个键关联起来，可以使用相应的键检索值。map 是一种无需的键值对的集合。map 最重要的一点是通过 key 来快速检索数据，key 类似于索引，指向数据的值。map 是一种集合，所以我们可以向迭代数组或切片一样迭代他，不过，map 是无序的，我们无法决定他返回的顺序，这是因为 map 底层是使用 hash 表来实现的，map 是引用类型变量

使用 map 过程中需注意的点：

- map 是无序的，每次打印出来的 map 都可能会不一致，它不能通过 index 获取，而必须通过 key 获取
- map 的长度是不固定的，也就是和切片一样，也是一种引用类型
- 内置的 `len()` 函数同样适用于 map，返回 map 拥有的所有 key 的数量
- map 的 key 可以是所有可比较类型，如布尔型、整型、浮点型、复杂性、字符串……
- 键不能重复，如果重复，那么新的 value 会覆盖原来的，程序不会报错

### map 的使用

#### 创建 map

可以使用 Go 内置的函数 `make()` 来定义 map：

```go
// 声明变量，map 的默认值是 nil
var map_variable map[key_data_type]value_data_type

// 使用 make 函数
map_variable := make(map[key_data_type]value_data_type)

// ------------------------------------------
rating := map[string]float32{"PHP": 5, "Go": 4.5, "Java": 3, "Python": 2}
```

如果不初始化 map，那么就会创建一个 nil map，nil map 不能用来存放键值对。

#### 读取 map

我们可以通过 key 获取 map 中对应的 value 值，语法为：

```go
map[key]
```

但是当 key 不存在时，我们会得到该 value 值类型的默认值，比如 string 类型得到空字符串，int 类型得到 0，但是程序并不会报错。所以我们可以使用 ok-idiom 获取值，以便确认 key 是否在 map 中存在

```go
value, ok := map[key]
if ok {
    fmt.Println("对应的数值是：", value)
} else {
    fmt.Println("key 不存在，获取的是零值", value)
}
```

## 类型转换

Go 语言是静态类型语言，要求赋值、运算必须类型一致。没有隐式类型转换，只有在需要时强制类型转换，且只能在两个支持相互转换的类型才可以转换。

强制转换类型的基本语法如下：

```
Type(Value)
```

其中，Type 表示要转换的类型，Value 为要转换的变量、复杂运算和函数返回值等等。

```go
var num1 int8
num1 = 10

var num2 int16
num2 = int16(num1)
fmt.Printf("%T,%d,%T,%d", num1, num1, num2, num2) // int8,10,int16,10

float1 := 4.83
var num3 int
num3 = int(float1)

fmt.Printf("%T,%f,%T,%d", float1, float1, num3, num3) // float64,4.830000,int,4
```

[^1]: 字符串字面量（stringliteral）是指双引号引住的一系列字符，双引号中可以没有字符，可以只有一个字符，也可以有很多个字符。
