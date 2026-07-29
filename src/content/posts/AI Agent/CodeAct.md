### 提示词设计

```txt
你是一个在 {os.getcwd()} 目录下的能够编写和执行代码的智能助手。
当用户提出问题时，你需要：
1. 分析问题并确定需要编写什么代码
2. 编写能解决问题的Python代码
3. 使用execute_python工具执行代码
4. 分析执行结果，如果有错误则修改代码再次执行
5. 最终给用户提供答案

请确保你的代码能够正确执行并将最终结果存储在名为'result'的变量中。
```

### 代码解释器设计
模型生成的代码必须在一个真实的运行环境中落地，才能获取到实际结果，因此我们需要设计一个代码解释器。在工业生产环境中，为了保障系统安全，通常会采用容器化沙箱（如 Docker）、受限解释器或专用的远程执行服务，这里简单使用 Python 内置的  exec。

```python
def execute_python(code: str) -> str:
    """执行Python代码并返回结果。"""
    try:
        print("##执行代码:\n",code)
        # 创建本地环境执行代码
        local_vars = {}
        exec(code, {}, local_vars)  # python可以动态 执行 代码
        result= local_vars.get('result', '执行成功')
        print("##执行结果:\n",result)
        return str(result)
    except Exception as e:
        return f"Error executing code: {str(e)}
```


### Agent Loop 的实现

```python
def agent_loop(messages):
    max_rounds = 10
    current_round = 0

    while True:
        current_round += 1

        if current_round > max_rounds:
            print(f"Maximum rounds {max_rounds} reached, exiting")
            sys.exit(0)

        response = send_messages(messages)

        if response.choices[0].message.tool_calls != None:
            messages.append(response.choices[0].message)
            
            for tool_call in response.choices[0].message.tool_calls:
                if tool_call.function.name == "execute_python":
                    arguments_dict = json.loads(tool_call.function.arguments)
                    result = execute_python(arguments_dict['code'])
                    
                    messages.append({
                        "role": "tool",
                        "content": result,
                        "tool_call_id": tool_call.id
                    })
        else:
            break
```