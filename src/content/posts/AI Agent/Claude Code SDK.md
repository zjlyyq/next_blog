### 快速跑通
```ts
import { query } from '@anthropic-ai/claude-agent-sdk';
import dotenv from 'dotenv';

dotenv.config(); // 加载环境变量配置

// 设置环境变量（与 Python 的 os.environ.setdefault 等效）
// 注意：Node.js 中如果变量已存在则不会覆盖（setdefault 行为），用以下方式模拟
function setDefaultEnv(key: string, value: string) {
  if (!process.env[key]) {
    process.env[key] = value;
  }
}

setDefaultEnv('ANTHROPIC_BASE_URL', process.env.ANTHROPIC_LANZ_BASE_URL || 'https://api.anthropic.com');
setDefaultEnv('ANTHROPIC_MODEL', 'Qwen3-Coder-Flash');
setDefaultEnv('ANTHROPIC_SMALL_FAST_MODEL', 'Qwen3-Coder-Flash');
setDefaultEnv('ANTHROPIC_API_KEY', process.env.DEEPSEEK_API_KEY || '');

for await (const message of query({
  prompt: 'fix the bug in file ./demo1_ts/utils.ts',
  options: { allowedTools: ['Read', 'Edit', 'Bash'] },
})) {
  console.log(message); // Claude reads the file, finds the bug, edits it
}

```
运行结果：

```sh
◇ injected env (3) from .env // tip: ⌘ multiple files { path: ['.env.local', '.env'] }
{
  type: 'system',
  subtype: 'init',
  cwd: 'E:\\2026_S3\\geektime-keepsake\\herness-agent\\chapter\\05',
  session_id: '3b5e28b6-cc74-4cf3-b20a-ff12bb4e5456',
  tools: [
    'Task',            'TaskOutput',
    'Bash',            'Glob',
    'Grep',            'ExitPlanMode',
    'Read',            'Edit',
    'Write',           'NotebookEdit',
    'WebFetch',        'TodoWrite',
    'WebSearch',       'KillShell',
    'AskUserQuestion', 'Skill',
    'EnterPlanMode'
  ],
  mcp_servers: [],
  model: 'Qwen3-Coder-Flash',
  permissionMode: 'default',
  slash_commands: [
    'compact',
    'context',
    'cost',
    'init',
    'pr-comments',
    'release-notes',
    'review',
    'security-review'
  ],
  apiKeySource: 'ANTHROPIC_API_KEY',
  claude_code_version: '2.1.0',
  output_style: 'default',
  agents: [ 'Bash', 'general-purpose', 'statusline-setup', 'Explore', 'Plan' ],
  skills: [],
  plugins: [],
  uuid: '7dc22abc-3c88-4fe9-8844-1c4cc7c7f32b'
}
{
  type: 'assistant',
  message: {
    content: [ [Object] ],
    id: '171abf88c1f1497f83c5da288dbf14ca',
    model: 'Qwen3-Coder-30B',
    role: 'assistant',
    stop_reason: null,
    stop_sequence: null,
    type: 'message',
    usage: {
      cache_cost: 0,
      cache_creation_input_tokens: 0,
      cache_read_input_tokens: 0,
      cached_tokens: 0,
      completion_cost: 0,
      input_tokens: 13640,
      output_tokens: 64,
      prompt_cost: 0
    },
    context_management: null
  },
  parent_tool_use_id: null,
  session_id: '3b5e28b6-cc74-4cf3-b20a-ff12bb4e5456',
  uuid: '59dba141-c041-456d-bc07-e7bd15063cc3'
}
{
  type: 'assistant',
  message: {
    content: [ [Object] ],
    id: '171abf88c1f1497f83c5da288dbf14ca',
    model: 'Qwen3-Coder-30B',
    role: 'assistant',
    stop_reason: 'tool_use',
    stop_sequence: null,
    type: 'message',
    usage: {
      cache_cost: 0,
      cache_creation_input_tokens: 0,
      cache_read_input_tokens: 0,
      cached_tokens: 0,
      completion_cost: 0,
      input_tokens: 13640,
      output_tokens: 64,
      prompt_cost: 0
    },
    context_management: null
  },
  parent_tool_use_id: null,
  session_id: '3b5e28b6-cc74-4cf3-b20a-ff12bb4e5456',
  uuid: 'd6634a92-741e-46ab-91de-8047a76f05e3'
}
{
  type: 'assistant',
  message: {
    content: [ [Object] ],
    id: '171abf88c1f1497f83c5da288dbf14ca',
    model: 'Qwen3-Coder-30B',
    role: 'assistant',
    stop_reason: 'tool_use',
    stop_sequence: null,
    type: 'message',
    usage: {
      cache_cost: 0,
      cache_creation_input_tokens: 0,
      cache_read_input_tokens: 0,
      cached_tokens: 0,
      completion_cost: 0,
      input_tokens: 13640,
      output_tokens: 64,
      prompt_cost: 0
    },
    context_management: null
  },
  parent_tool_use_id: null,
  session_id: '3b5e28b6-cc74-4cf3-b20a-ff12bb4e5456',
  uuid: 'd2a8abbc-8f95-4385-a942-6e4491c8af66'
}
{
  type: 'user',
  message: { role: 'user', content: [ [Object] ] },
  parent_tool_use_id: null,
  session_id: '3b5e28b6-cc74-4cf3-b20a-ff12bb4e5456',
  uuid: '67c4a87e-20e6-4c4e-afd0-62194e427bbb',
  tool_use_result: {
    type: 'text',
    file: {
      filePath: './demo1_ts/utils.ts',
      content: 'const compare = (a:number, b: number) => {\n' +
        '  if (a > b) {\n' +
        '    return 1;\n' +
        '  }\n' +
        '  if (a < b) {\n' +
        '    return -1;\n' +
        '  }\n' +
        '  return -1;\n' +
        '};\n',
      numLines: 10,
      startLine: 1,
      totalLines: 10
    }
  }
}
{
  type: 'assistant',
  message: {
    content: [ [Object] ],
    id: 'd8d8fbbe975e44e5ab57f444edb28299',
    model: 'Qwen3-Coder-30B',
    role: 'assistant',
    stop_reason: null,
    stop_sequence: null,
    type: 'message',
    usage: {
      cache_cost: 0,
      cache_creation_input_tokens: 0,
      cache_read_input_tokens: 0,
      cached_tokens: 0,
      completion_cost: 0,
      input_tokens: 0,
      output_tokens: 0,
      prompt_cost: 0
    },
    context_management: null
  },
  parent_tool_use_id: null,
  session_id: '3b5e28b6-cc74-4cf3-b20a-ff12bb4e5456',
  uuid: '9dc82d92-17ed-42fb-abbb-7dcf57978e24'
}
{
  type: 'assistant',
  message: {
    content: [ [Object] ],
    id: 'd8d8fbbe975e44e5ab57f444edb28299',
    model: 'Qwen3-Coder-30B',
    role: 'assistant',
    stop_reason: null,
    stop_sequence: null,
    type: 'message',
    usage: {
      cache_cost: 0,
      cache_creation_input_tokens: 0,
      cache_read_input_tokens: 0,
      cached_tokens: 0,
      completion_cost: 0,
      input_tokens: 0,
      output_tokens: 0,
      prompt_cost: 0
    },
    context_management: null
  },
  parent_tool_use_id: null,
  session_id: '3b5e28b6-cc74-4cf3-b20a-ff12bb4e5456',
  uuid: 'f8e130ef-da5c-4e39-86a2-0a90b10c856f'
}
{
  type: 'assistant',
  message: {
    content: [ [Object] ],
    id: 'd8d8fbbe975e44e5ab57f444edb28299',
    model: 'Qwen3-Coder-30B',
    role: 'assistant',
    stop_reason: null,
    stop_sequence: null,
    type: 'message',
    usage: {
      cache_cost: 0,
      cache_creation_input_tokens: 0,
      cache_read_input_tokens: 0,
      cached_tokens: 0,
      completion_cost: 0,
      input_tokens: 13861,
      output_tokens: 267,
      prompt_cost: 0
    },
    context_management: null
  },
  parent_tool_use_id: null,
  session_id: '3b5e28b6-cc74-4cf3-b20a-ff12bb4e5456',
  uuid: '6d308ec0-8d85-4065-b6b5-fff594413508'
}
{
  type: 'user',
  message: { role: 'user', content: [ [Object] ] },
  parent_tool_use_id: null,
  session_id: '3b5e28b6-cc74-4cf3-b20a-ff12bb4e5456',
  uuid: 'fe6ba6dc-9a45-4fed-a35b-719cfefebcd9',
  tool_use_result: 'Error: Found 2 matches of the string to replace, but replace_all is false. To replace all occurrences, set replace_all to true. To replace only one occurrence, please provide more context to uniquely identify the instance.\n' +
    'String:   return -1;'
}
{
  type: 'assistant',
  message: {
    content: [ [Object] ],
    id: '1bea1260d2e5479d933f5c469b57a8ba',
    model: 'Qwen3-Coder-30B',
    role: 'assistant',
    stop_reason: null,
    stop_sequence: null,
    type: 'message',
    usage: {
      cache_cost: 0,
      cache_creation_input_tokens: 0,
      cache_read_input_tokens: 0,
      cached_tokens: 0,
      completion_cost: 0,
      input_tokens: 0,
      output_tokens: 0,
      prompt_cost: 0
    },
    context_management: null
  },
  parent_tool_use_id: null,
  session_id: '3b5e28b6-cc74-4cf3-b20a-ff12bb4e5456',
  uuid: '23fd66dd-0b41-4c20-8dac-fc97918942b1'
}
{
  type: 'assistant',
  message: {
    content: [ [Object] ],
    id: '1bea1260d2e5479d933f5c469b57a8ba',
    model: 'Qwen3-Coder-30B',
    role: 'assistant',
    stop_reason: null,
    stop_sequence: null,
    type: 'message',
    usage: {
      cache_cost: 0,
      cache_creation_input_tokens: 0,
      cache_read_input_tokens: 0,
      cached_tokens: 0,
      completion_cost: 0,
      input_tokens: 0,
      output_tokens: 0,
      prompt_cost: 0
    },
    context_management: null
  },
  parent_tool_use_id: null,
  session_id: '3b5e28b6-cc74-4cf3-b20a-ff12bb4e5456',
  uuid: 'dc120c88-ade7-4cc0-9269-058050eb9bd6'
}
{
  type: 'assistant',
  message: {
    content: [ [Object] ],
    id: '1bea1260d2e5479d933f5c469b57a8ba',
    model: 'Qwen3-Coder-30B',
    role: 'assistant',
    stop_reason: 'tool_use',
    stop_sequence: null,
    type: 'message',
    usage: {
      cache_cost: 0,
      cache_creation_input_tokens: 0,
      cache_read_input_tokens: 0,
      cached_tokens: 0,
      completion_cost: 0,
      input_tokens: 14083,
      output_tokens: 116,
      prompt_cost: 0
    },
    context_management: null
  },
  parent_tool_use_id: null,
  session_id: '3b5e28b6-cc74-4cf3-b20a-ff12bb4e5456',
  uuid: '1bd98edb-c89b-4f2a-bc3c-3ca71573e2ed'
}
{
  type: 'user',
  message: { role: 'user', content: [ [Object] ] },
  parent_tool_use_id: null,
  session_id: '3b5e28b6-cc74-4cf3-b20a-ff12bb4e5456',
  uuid: '56c847de-c3b6-4115-aded-24f620a02051',
  tool_use_result: {
    filePath: './demo1_ts/utils.ts',
    oldString: '  if (a < b) {\n    return -1;\n  }\n  return -1;',
    newString: '  if (a < b) {\n    return -1;\n  }\n  return 0;',
    originalFile: 'const compare = (a:number, b: number) => {\n' +
      '  if (a > b) {\n' +
      '    return 1;\n' +
      '  }\n' +
      '  if (a < b) {\n' +
      '    return -1;\n' +
      '  }\n' +
      '  return -1;\n' +
      '};\n',
    structuredPatch: [ [Object] ],
    userModified: false,
    replaceAll: false
  }
}
{
  type: 'assistant',
  message: {
    content: [ [Object] ],
    id: '5ac43eb4eccf4934a783c9bf8f0cf054',
    model: 'Qwen3-Coder-30B',
    role: 'assistant',
    stop_reason: null,
    stop_sequence: null,
    type: 'message',
    usage: {
      cache_cost: 0,
      cache_creation_input_tokens: 0,
      cache_read_input_tokens: 0,
      cached_tokens: 0,
      completion_cost: 0,
      input_tokens: 0,
      output_tokens: 0,
      prompt_cost: 0
    },
    context_management: null
  },
  parent_tool_use_id: null,
  session_id: '3b5e28b6-cc74-4cf3-b20a-ff12bb4e5456',
  uuid: 'b738027b-6904-4223-9878-c12c4fbb5c83'
}
{
  type: 'assistant',
  message: {
    content: [ [Object] ],
    id: '5ac43eb4eccf4934a783c9bf8f0cf054',
    model: 'Qwen3-Coder-30B',
    role: 'assistant',
    stop_reason: 'end_turn',
    stop_sequence: null,
    type: 'message',
    usage: {
      cache_cost: 0,
      cache_creation_input_tokens: 0,
      cache_read_input_tokens: 0,
      cached_tokens: 0,
      completion_cost: 0,
      input_tokens: 14348,
      output_tokens: 124,
      prompt_cost: 0
    },
    context_management: null
  },
  parent_tool_use_id: null,
  session_id: '3b5e28b6-cc74-4cf3-b20a-ff12bb4e5456',
  uuid: '5cee08c1-64a1-401f-976a-b0cc8cde7591'
}
{
  type: 'result',
  subtype: 'success',
  is_error: false,
  duration_ms: 19678,
  duration_api_ms: 16266,
  num_turns: 4,
  result: '\n' +
    '\n' +
    "The bug has been fixed. Here's what was wrong:\n" +
    '\n' +
    '**Line 8** returned `-1` when `a === b`, but it should return `0`. \n' +
    '\n' +
    'This `compare` function follows the standard comparison convention (like the one used by `Array.prototype.sort`):\n' +
    '- Returns `1` if `a > b`\n' +
    '- Returns `-1` if `a < b`\n' +
    '- Returns `0` if `a === b` ← this was the bug (was returning `-1`)',
  session_id: '3b5e28b6-cc74-4cf3-b20a-ff12bb4e5456',
  total_cost_usd: 0.22057500000000002,
  usage: {
    input_tokens: 55932,
    cache_creation_input_tokens: 0,
    cache_read_input_tokens: 0,
    output_tokens: 571,
    server_tool_use: { web_search_requests: 0, web_fetch_requests: 0 },
    service_tier: 'standard',
    cache_creation: { ephemeral_1h_input_tokens: 0, ephemeral_5m_input_tokens: 0 }
  },
  modelUsage: {
    'Qwen3-Coder-Flash': {
      inputTokens: 69510,
      outputTokens: 803,
      cacheReadInputTokens: 0,
      cacheCreationInputTokens: 0,
      webSearchRequests: 0,
      costUSD: 0.22057500000000002,
      contextWindow: 200000
    }
  },
  permission_denials: [],
  uuid: '572ff1a2-9a4e-4f50-873c-41404cc9c634'
}

```
错误代码直接被修改了：


```diff
diff --git a/herness-agent/chapter/05/demo1_ts/utils.ts b/herness-agent/chapter/05/demo1_ts/utils.ts 
index 0d1a658..6a252f6 100644
--- a/herness-agent/chapter/05/demo1_ts/utils.ts
+++ b/herness-agent/chapter/05/demo1_ts/utils.ts
@@ -5,5 +5,5 @@ const compare = (a:number, b: number) => {
   if (a < b) {
     return -1;
   }
-  return -1;
+  return 0;
 };
```