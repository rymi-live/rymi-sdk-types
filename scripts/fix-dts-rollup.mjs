import { readFileSync, writeFileSync } from 'node:fs';

const dtsPath = new URL('../dist/index.d.ts', import.meta.url);
let dts = readFileSync(dtsPath, 'utf8');

const replacements = new Map([
    ["import { AgentAdvancedConfig as AgentAdvancedConfig_2 } from './agent.js';\r\n", 'declare type AgentAdvancedConfig_2 = AgentAdvancedConfig;\n'],
    ["import { AgentFeatures as AgentFeatures_2 } from './agent.js';\r\n", 'declare type AgentFeatures_2 = AgentFeatures;\n'],
    ["import { AgentLlmProvider as AgentLlmProvider_2 } from './agent.js';\r\n", 'declare type AgentLlmProvider_2 = AgentLlmProvider;\n'],
    ["import { AgentPayload as AgentPayload_2 } from './agent.js';\r\n", 'declare type AgentPayload_2 = AgentPayload;\n'],
    ["import { AgentPersona as AgentPersona_2 } from './agent.js';\r\n", 'declare type AgentPersona_2 = AgentPersona;\n'],
    ["import { AgentPlaybook as AgentPlaybook_2 } from './agent.js';\r\n", 'declare type AgentPlaybook_2 = AgentPlaybook;\n'],
    ["import { AgentToolBinding as AgentToolBinding_2 } from './agentTools.js';\r\n", 'declare type AgentToolBinding_2 = AgentToolBinding;\n']
]);

for (const [from, to] of replacements) {
    dts = dts.replace(from, to);
}

writeFileSync(dtsPath, dts);
