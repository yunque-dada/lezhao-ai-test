# Python海龟画图课程PPT大纲

## 第1页：封面
标题：神奇的万花筒——用Python画出炫彩图案
副标题：Python海龟画图进阶课程
适合年级：小学3～6年级

## 第2页：课程目标
- 回顾海龟画图的基本命令
- 学会用for循环重复画图
- 学会用random模块让颜色随机变化
- 学会用旋转和大小变化创造炫酷效果

## 第3页：导入——什么是万花筒？
万花筒是一种光学玩具，里面有多彩的图案
转动万花筒，图案会不断变化，非常漂亮

## 第4页：准备工作
```python
import turtle
import random

t = turtle.Turtle()
t.speed(0)
turtle.bgcolor("black")
t.pensize(2)
```

## 第5页：准备颜色列表
```python
colors = ["red", "orange", "yellow", "green", "blue", 
          "purple", "pink", "cyan", "magenta"]
```

## 第6页：画一个基本图形——正八边形
```python
for side in range(8):
    t.forward(100)
    t.right(45)
```

## 第7页：让颜色随机变化
```python
for side in range(8):
    t.color(random.choice(colors))
    t.forward(100)
    t.right(45)
```

## 第8页：旋转整体图案
```python
for times in range(36):
    for side in range(8):
        t.color(random.choice(colors))
        t.forward(100)
        t.right(45)
    t.right(10)
```

## 第9页：增加变化——改变大小
```python
size = 50
for times in range(30):
    for side in range(8):
        t.color(random.choice(colors))
        t.forward(size)
        t.right(45)
    t.right(15)
    size = size + 3
```

## 第10页：完整代码（最终版）
```python
import turtle
import random

t = turtle.Turtle()
t.speed(0)
turtle.bgcolor("black")
t.pensize(2)

colors = ["red", "orange", "yellow", "green", "blue", 
          "purple", "pink", "cyan", "magenta"]

size = 20
for times in range(72):
    t.color(random.choice(colors))
    for side in range(30):
        t.forward(size)
        t.right(91)
        size += 1
    t.right(5)

t.hideturtle()
turtle.done()
```

## 第11页：互动活动——参数大挑战
修改下面这些参数，看看图案有什么变化：
- 外循环次数（72 → 36 或 120）
- 内循环次数（30 → 10 或 50）
- 旋转角度（5 → 10 或 2）
- 颜色列表（添加自己喜欢的颜色）

## 第12页：作品展示与分享
运行你的程序，保存截图，向大家介绍你的作品

## 第13页：课程总结
- 用循环画出重复图案
- 用随机数让颜色多变
- 通过旋转和大小变化创造动态效果

## 第14页：拓展思考（课后作业）
- 颜色渐变：试试不用随机，而是让颜色按顺序变化
- 图形变形：把正八边形改成五边形或圆形
- 家庭作业：创作"送给妈妈的万花筒"或"星空万花筒"

## 第15页：结束页
谢谢大家！期待你们的创意作品
