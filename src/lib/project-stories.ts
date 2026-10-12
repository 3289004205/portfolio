export type ProjectStory = {
  summary: string
  focus: string
  highlights: { title: string; description: string }[]
}

export const PROJECT_STORIES: Record<string, ProjectStory> = {
  visual: {
    summary: '把分散的 AI 工具，连接成团队可以复用的创作入口。',
    focus: '主导系统搭建 · 工具整合 · 工作流设计',
    highlights: [
      { title: '六大模块统一入口', description: '将画布、知识、资产与学习资源等能力组织在同一个系统中。' },
      { title: '从操作到资源沉淀', description: '围绕任务组织工具与素材，让创作流程和已有资源更容易衔接。' },
      { title: '无限画布编排素材', description: '在自由画布中组织图片、参考内容与工作流，直观梳理创作思路。' },
    ],
  },
  'motion-templates': {
    summary: '把重复的视频素材替换，整理成可复用的模板制作流程。',
    focus: '模板复用 · 素材替换 · 动效预览',
    highlights: [
      { title: '两种模板场景', description: '课程卡片轮播与智能互联动态人物，覆盖静态卡片和动态素材展示。' },
      { title: '替换素材，即时预览', description: '素材面板与预览区域并置，方便检查替换后的构图和动态效果。' },
      { title: '保留模板动效', description: '沿用模板的卡片缩放与切换动画，将制作重点集中在内容替换。' },
    ],
  },
  'skill-hub': {
    summary: '将分散的 AI 技能，组织成可以按任务选择的执行流程。',
    focus: '技能组织 · 批量任务 · 结果管理',
    highlights: [
      { title: '按任务查找技能', description: '以场景、人像、渲染、产品等分类组织技能，减少查找成本。' },
      { title: '参考图与产品图分开输入', description: '区分场景参考和产品素材，清楚表达两类输入的用途。' },
      { title: '任务过程可见', description: '通过任务队列、生成状态和结果详情，串联输入、执行与查看结果。' },
    ],
  },
  preset: {
    summary: '将生图参数和提示词组织成预设，降低重复配置的成本。',
    focus: '提示词预设 · 一键生图 · ComfyUI',
    highlights: [
      { title: '从模板开始', description: '通过预设模板选择进入任务，减少从空白提示词开始的配置。' },
      { title: '统一生图入口', description: '连接提示词与 ComfyUI 生图流程，让参数配置更集中。' },
      { title: '围绕产出评估', description: '从商品一致性、图片质量和卖点表达三个方面检查生成结果。' },
    ],
  },
  kb: {
    summary: '把部门文档变成可检索、可提问的知识入口。',
    focus: '知识整理 · RAG · 问答机器人',
    highlights: [
      { title: '部门知识集中组织', description: '围绕各部门的资料与问答需求搭建知识库。' },
      { title: '检索与回答衔接', description: '通过召回与重排序筛选文档片段，提供回答所需的上下文。' },
      { title: '关注准确率与覆盖率', description: '用回答准确性和问题覆盖范围衡量知识库的使用价值。' },
    ],
  },
  'geo-materials': {
    summary: '围绕素材、文案与模板，梳理批量制作的完整链路。',
    focus: '素材组织 · 模板配置 · 批量制作',
    highlights: [
      { title: '素材输入', description: '集中整理产品图片与制作需求。' },
      { title: '内容与模板匹配', description: '将展示字段、文案和版式放在同一条制作流程中。' },
      { title: '成品检查与复用', description: '通过任务进度与执行日志查看处理过程，集中展示成品素材、映射文件与质检报告。' },
    ],
  },
  others: {
    summary: '从高频重复操作切入，用小工具缩短设计流程。',
    focus: 'Figma 插件 · 提示词工具 · 素材管理',
    highlights: [
      { title: '提示词与素材衔接', description: '整合反推提示词、素材检索与常用资源。' },
      { title: '批量替换主图', description: '通过 Figma 插件处理活动素材的重复修改。' },
      { title: '把检查留给设计师', description: '以运营改表、设计师检查的方式组织批量制作流程。' },
    ],
  },
}
