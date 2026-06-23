declare type AgentAdvancedConfig_2 = AgentAdvancedConfig;
declare type AgentFeatures_2 = AgentFeatures;
declare type AgentLlmProvider_2 = AgentLlmProvider;
declare type AgentPayload_2 = AgentPayload;
declare type AgentPersona_2 = AgentPersona;
declare type AgentPlaybook_2 = AgentPlaybook;
declare type AgentToolBinding_2 = AgentToolBinding;

export declare interface Agent {
    id: string;
    name: string;
    agent_role: AgentRole;
    language?: string | null;
    voice?: string;
    persona?: AgentPersona_2;
    playbook?: AgentPlaybook_2;
    advanced?: AgentAdvancedConfig_2;
    post_call?: AgentPayload_2['post_call'];
    features?: AgentFeatures_2;
    llm_provider?: AgentLlmProvider_2;
    llm_model?: string;
    stt_provider?: string;
    stt_model?: string;
    tts_provider?: string;
    tts_model?: string;
    provider_config?: any;
    raw_system_prompt?: string | null;
    compiled_prompt?: string;
    created_at?: string;
}

/** Runtime and speech configuration. */
export declare interface AgentAdvancedConfig {
    offLimitsTopics?: string;
    prohibitedClaims?: string;
    maxTurnLength?: number;
    silencePromptDelay?: number;
    postSilenceHangup?: number;
    maxCallDuration?: number;
    startSpeakingThreshold?: number;
    startSpeakingPhrasing?: 'agent_greets' | 'wait_for_user';
    replyDelay?: number;
    stopSpeakingThreshold?: number;
    resumeAfterInterruption?: boolean;
    smartEndpointing?: boolean;
    waitAfterSentence?: number;
    waitAfterNoPunctuation?: number;
    waitAfterNumbers?: number;
    stt_confidence_threshold?: number;
    stt_numeral_formatting?: boolean;
    stt_profanity_filter?: boolean;
    stt_keywords?: string;
    /** Server-side noise suppression on inbound audio (Deepgram). */
    stt_background_denoising?: boolean;
    /** LLM sampling temperature (0–2). 0.5 is balanced. */
    temperature?: number;
    /** Hard cap on LLM response tokens per turn. */
    maxTokens?: number;
    /** Pipecat-style LLM turn-completion gating: the reply's first token is a
     *  completion marker; incomplete markers suppress the spoken reply. Default off.
     *  Stored in `agents.advanced_config` JSONB — no migration. Independent of the
     *  agent's core-LLM choice (eval results are advisory; works best on gpt-4o-mini). */
    turnCompletion?: {
        enabled?: boolean;
        markerSet?: 'unicode' | 'ascii';
        incompleteShortMs?: number;
        incompleteLongMs?: number;
    };
    prompt_mode?: 'builder' | 'raw';
}

export declare interface AgentCallerPersona {
    type?: string;
    approach?: string;
}

export declare interface AgentConfig {
    id?: string;
    name: string;
    companyName: string;
    companyWebsite: string;
    companyDescription: string;
    knowledgeBase: string[];
    role: string;
    audienceDescription: string;
    tone: string;
    llm_provider: 'gemini' | 'openai' | 'anthropic' | 'sarvam';
    llm_model: string | null;
    llm_fallback_provider?: string | null;
    llm_fallback_model?: string | null;
    stt_provider?: string;
    stt_model?: string | null;
    stt_fallback_provider?: string | null;
    stt_fallback_model?: string | null;
    tts_provider?: string;
    tts_model?: string | null;
    tts_fallback_provider?: string | null;
    tts_fallback_model?: string | null;
    custom_llm_url?: string | null;
    custom_voice_url?: string | null;
    /** Wire shape used by the custom voice endpoint when tts_provider is 'custom-voice'. */
    custom_voice_mode?: 'rymi' | 'openai-compat';
    custom_transcriber_url?: string | null;
    agent_role: 'operator' | 'specialist' | 'executive' | 'concierge';
    language: string | null;
    supported_languages: string[];
    voice: string;
    accent: string;
    bargeInEnabled: boolean;
    callerPersonas: any[];
    opener: string;
    qualificationFlow: AgentQualificationStep[];
    requiredSlots: string[];
    primaryCTA: string;
    backupGoal?: string;
    fallbackCTA: string;
    escalationRule: string;
    /** Final line the agent says right before hanging up a successful call. */
    endCallMessage: string;
    scripts: any[];
    objections: any[];
    successCriteria: any[];
    extractionTags: any[];
    postCallSchema: string[];
    restrictedTopics: string[];
    forbiddenPromises: string[];
    offLimits: string;
    prohibitedClaims: string;
    maxTurnLength: number;
    silencePromptDelay: number;
    postSilenceHangup: number;
    maxCallDuration: number;
    startSpeakingThreshold: number;
    startSpeakingPhrasing: 'agent_greets' | 'wait_for_user';
    replyDelay: number;
    stopSpeakingThreshold: number;
    resumeAfterInterruption: boolean;
    smartEndpointing: boolean;
    waitAfterSentence: number;
    waitAfterNoPunctuation: number;
    waitAfterNumbers: number;
    stt_confidence_threshold: number;
    stt_numeral_formatting: boolean;
    stt_profanity_filter: boolean;
    stt_keywords: string;
    stt_background_denoising: boolean;
    /** LLM sampling temperature (0–2). Defaults to 0.5. */
    temperature: number;
    /** Hard cap on LLM response tokens per turn. Defaults to 250. */
    maxTokens: number;
    recordingEnabled: boolean;
    transcriptionEnabled: boolean;
    requireConsent: boolean;
    postCallSummaryEnabled: boolean;
    postCallSummaryPrompt: string;
    postCallExtractionEnabled: boolean;
    postCallExtractionFields: string[];
    postCallEvaluationEnabled: boolean;
    postCallEvaluationRubric: string;
    postCallLlmProvider: 'gemini' | 'openai' | '';
    postCallLlmModel: string;
    transferNumber: string;
    smsContinuationEnabled: boolean;
    smsContinuationReconnectUrl: string;
    voicemailBehavior: 'leave_message' | 'hangup';
    voicemailScript: string;
    disableCallerMemory: boolean;
    provider_config?: any;
    attached_numbers?: string[];
    chat_summary?: string;
    /**
     * Per-agent built-in tool bindings. v1 ships three vetted tools (calendar /
     * ticket / customer lookup) — see BUILTIN_TOOL_CATALOG. Optional for back-
     * compat: agents that pre-date this field default to "no tools enabled".
     */
    tools?: AgentToolBinding_2[];
    variables?: AgentVariable[];
    promptMode?: 'builder' | 'raw';
    rawSystemPrompt?: string | null;
}

/** Feature flags for recording, transcription, and consent. */
export declare interface AgentFeatures {
    recording_enabled?: boolean;
    transcription_enabled?: boolean;
    require_consent?: boolean;
}

/**
 * Typed interfaces for the Rymi Agent configuration schema.
 *
 * These match the shape accepted by POST /v1/agents and PUT /v1/agents/:id.
 * The canonical JSON Schema definitions live in agentRouteSchemas.ts (API).
 */
export declare type AgentLlmProvider = 'gemini' | 'openai' | 'anthropic' | 'sarvam';

declare interface AgentObjectionHandler {
    trigger?: string;
    response?: string;
}

/**
 * The complete agent payload shape accepted by the REST API.
 * Use this as the canonical "middle JSON" for serialisation, import/export, and cloning.
 */
export declare interface AgentPayload {
    name: string;
    voice?: string;
    language?: string | null;
    supported_languages?: string[];
    agent_role?: 'operator' | 'specialist' | 'executive' | 'concierge';
    llm_provider?: AgentLlmProvider;
    llm_model?: string;
    llm_fallback_provider?: string | null;
    llm_fallback_model?: string | null;
    stt_provider?: string;
    stt_model?: string;
    stt_fallback_provider?: string | null;
    stt_fallback_model?: string | null;
    tts_provider?: string;
    tts_model?: string;
    tts_fallback_provider?: string | null;
    tts_fallback_model?: string | null;
    persona?: AgentPersona;
    playbook?: AgentPlaybook;
    advanced?: AgentAdvancedConfig;
    features?: AgentFeatures;
    post_call?: {
        summary?: {
            enabled?: boolean;
            prompt?: string | null;
        };
        evaluation?: {
            rubric?: string | null;
        };
        structured_extraction?: {
            prompt?: string | null;
            json_schema?: Record<string, any> | null;
        };
        model?: {
            provider?: AgentLlmProvider | null;
            model?: string | null;
        };
    };
}

/** Structured persona: who the agent is, who it talks to, and how it sounds. */
export declare interface AgentPersona {
    role?: string;
    audienceDescription?: string;
    toneOverride?: string;
    successCriteria?: string[];
    voiceConfig?: AgentVoiceConfig;
    callerPersonas?: AgentCallerPersona[];
    /** Company context injected into the system prompt. */
    companyName?: string;
    companyWebsite?: string;
    companyDescription?: string;
    knowledgeBase?: string[];
}

/** Structured playbook: conversation flow, objections, scripts, and CTAs. */
export declare interface AgentPlaybook {
    opener?: string;
    qualificationFlow?: AgentQualificationStep[];
    requiredSlots?: AgentRequiredSlot[];
    objectionHandlers?: AgentObjectionHandler[];
    scripts?: AgentScript[];
    closingCTA?: string;
    fallbackCTA?: string;
    escalationRule?: string;
    /** Final line the agent says right before hanging up a successful call. */
    endCallMessage?: string;
}

declare interface AgentQualificationStep {
    question?: string;
    prompt?: string;
    listensFor?: string;
    listens_for?: string;
    listenFor?: string;
    slotName?: string;
    slot_name?: string;
}

export declare interface AgentRequiredSlot {
    name?: string;
    description?: string;
    required?: boolean;
}

export declare type AgentRole = 'operator' | 'specialist' | 'executive' | 'concierge';

export declare interface AgentScript {
    title?: string;
    when?: string;
    content?: string;
}

export declare interface AgentTemplate {
    id: string;
    label: string;
    icon: string;
    description: string;
    color: string;
    defaults: AgentTemplateDefaults;
}

declare interface AgentTemplateDefaults {
    role: string;
    audienceDescription: string;
    tone: string;
    opener: string;
    qualificationFlow: Array<{
        question: string;
        listens_for: string;
    }>;
    requiredSlots: string[];
    primaryCTA: string;
    fallbackCTA: string;
    escalationRule: string;
    scripts: Array<{
        title: string;
        when_to_use: string;
        content: string;
    }>;
    objections: Array<{
        trigger: string;
        response: string;
    }>;
    successCriteria: string[];
    offLimits: string;
    prohibitedClaims: string;
    language?: string;
    agentRole?: 'operator' | 'specialist' | 'executive' | 'concierge';
    bargeInEnabled?: boolean;
    maxCallDuration?: number;
    knowledgeBaseHints?: string[];
    extractionTags?: string[];
    restrictedTopics?: string[];
    forbiddenPromises?: string[];
    recordingEnabled?: boolean;
    transcriptionEnabled?: boolean;
    requireConsent?: boolean;
    postCallSummaryEnabled?: boolean;
    postCallSummaryPrompt?: string;
    postCallExtractionEnabled?: boolean;
    postCallExtractionFields?: string[];
    postCallEvaluationEnabled?: boolean;
    postCallEvaluationRubric?: string;
    stt_keywords?: string;
    callerPersonas?: Array<{
        type: string;
        detectedWhen: string;
        approach: string;
    }>;
    setupQuestions?: SetupQuestion[];
    variables?: AgentVariable[];
    matchKeywords?: string[];
}

export declare type AgentTemplateStatus = 'draft' | 'submitted' | 'approved' | 'published' | 'rejected' | 'archived';

export declare type AgentTemplateVisibility = 'private' | 'tenant' | 'public';

/**
 * Per-agent binding for one built-in tool. Credentials are referenced
 * by id (resolved server-side from a secrets store), never embedded.
 *
 * `provider_settings` is an opaque per-tool config bag — e.g. for
 * check_calendar_availability it might hold `{ calendar_id, timezone }`.
 * Schema is intentionally `unknown` here because each tool validates its
 * own settings against a Zod schema at registration time.
 */
export declare interface AgentToolBinding {
    tool_id: BuiltinAgentToolId;
    enabled: boolean;
    /** Reference into tenant_credentials. Null means "use the platform default". */
    credential_ref: string | null;
    /** Per-call execution timeout. Capped at 10s by the runtime. */
    timeout_ms: number;
    side_effect: ToolSideEffect;
    /** Free-form per-tool config — see provider_settings note above. */
    provider_settings?: Record<string, unknown>;
}

export declare interface AgentVariable {
    key: string;
    description: string;
    metadataKey?: string;
    required: boolean;
    default?: string;
    /**
     * Live METHOD when not satisfied by input/default. Optional on the wire for
     * legacy rows; use `normalizeVariableAcquisition` to read a concrete value.
     */
    acquisition?: VariableAcquisition;
    origin?: VariableOrigin;
    /**
     * Value type used to validate incoming metadata. When omitted the variable
     * behaves as a free-form string (legacy behavior, byte-identical resolution).
     * A metadata value that does not satisfy this type is treated as missing.
     */
    type?: AgentVariableType;
    /**
     * Allowed values when `type === 'enum'`. A metadata value not in this list is
     * treated as missing. Ignored for non-enum types. An enum with no/empty
     * `enumValues` falls back to lenient string passthrough.
     */
    enumValues?: string[];
}

/** Allowed value-type for a caller variable. Absent ⇒ treated as 'string'. */
declare type AgentVariableType = 'string' | 'number' | 'boolean' | 'enum';

export declare interface AgentVoiceConfig {
    voiceId?: string;
    language?: string;
    accent?: string;
    bargeInEnabled?: boolean;
}

export declare type BuiltinAgentToolId = 'handoff_to_human' | 'check_calendar_availability' | 'list_calendar_events' | 'create_calendar_event' | 'update_calendar_event' | 'delete_calendar_event' | 'lookup_customer' | 'send_whatsapp_message' | 'send_telegram_message' | 'send_asset';

export declare interface Call {
    id: string;
    room_name: string;
    user_id?: string;
    tenant_id?: string;
    agent_id: string;
    status: CallStatus;
    recording_status: 'none' | 'requested' | 'active' | 'processing' | 'completed' | 'failed';
    started_at: string | null;
    ended_at: string | null;
    end_reason?: string | null;
    error_code?: string | null;
    error_message?: string | null;
    metadata: Record<string, any>;
    created_at: string;
    updated_at: string;
}

export declare interface CallEvaluationResult {
    rubric: string;
    passed: boolean | null;
    score: number | null;
    reasoning: string | null;
}

export declare type CallIntelligenceStatus = 'not_started' | 'pending' | 'processing' | 'completed' | 'partial' | 'failed' | 'dead_letter';

export declare interface CallParticipant {
    id: string;
    call_id: string;
    user_id?: string | null;
    role: CallParticipantRole;
    transport: CallParticipantTransport;
    identity: string;
    status: CallParticipantStatus;
    metadata: Record<string, any>;
    joined_at: string;
    left_at: string | null;
    created_at: string;
}

export declare type CallParticipantRole = 'agent' | 'customer' | 'observer';

export declare type CallParticipantStatus = 'joining' | 'active' | 'left' | 'failed';

export declare type CallParticipantTransport = 'webrtc' | 'pstn' | 'sip' | 'internal';

export declare interface CallRecording {
    id: string;
    call_id: string;
    participant_id?: string | null;
    recording_url?: string | null;
    provider_recording_id?: string | null;
    format: string;
    status: 'processing' | 'completed' | 'failed';
    duration?: number | null;
    size_bytes?: number | null;
    metadata: Record<string, any>;
    created_at: string;
}

export declare type CallSentiment = 'positive' | 'neutral' | 'negative' | 'unknown';

export declare type CallStatus = 'queued' | 'ringing' | 'in_progress' | 'completed' | 'failed' | 'no_answer' | 'busy' | 'canceled';

export declare interface CallStatusChangedEvent extends TelephonyBaseEvent {
    type: 'call.status_changed';
    status: TelephonyCallStatus;
    callId: string;
}

export declare interface CallTranscriptEvent {
    id: string;
    call_id: string;
    participant_id: string | null;
    role: 'user' | 'agent';
    text: string;
    sequence: number;
    source: 'runtime' | 'stt' | 'post_call';
    started_at_ms: number | null;
    ended_at_ms: number | null;
    metadata: Record<string, any>;
    created_at: string;
}

declare type CallTranscriptSpeaker = 'user' | 'agent';

declare interface CapabilityUnsupportedEvent extends TelephonyBaseEvent {
    type: 'capability.unsupported';
    requestedType: TelephonyEventType;
}

declare type ConnectorCategory = 'calendar' | 'crm' | 'ticketing' | 'messaging';

/** Safe view of a workspace connector connection. NEVER includes tokens. */
export declare interface ConnectorConnectionSafeView {
    id: string;
    provider: string;
    category: ConnectorCategory;
    displayName: string;
    accountName: string;
    status: 'connected' | 'expired' | 'error';
    scopes: string[];
    connectedAt: string;
    expiresAt: string | null;
}

export declare type CreateKnowledgeSourceRequest = CreateKnowledgeSourceTextRequest | CreateKnowledgeSourceUrlRequest;

/** Request body for POST /agents/:id/knowledge-sources (text mode). */
export declare interface CreateKnowledgeSourceTextRequest {
    kind: 'text';
    title: string;
    text: string;
}

/** Request body for POST /agents/:id/knowledge-sources (url mode). */
export declare interface CreateKnowledgeSourceUrlRequest {
    kind: 'url';
    title: string;
    url: string;
}

declare interface DtmfReceivedEvent extends TelephonyBaseEvent {
    type: 'dtmf.received';
    digit: string;
}

export declare interface Invoice {
    id: string;
    invoice_number: string;
    tenant_id: string;
    kind: InvoiceKind;
    status: InvoiceStatus;
    currency: string;
    subtotal_minor: number;
    tax_minor: number;
    discount_minor: number;
    total_minor: number;
    gateway: InvoiceGateway;
    gateway_invoice_id: string | null;
    payment_event_id: string | null;
    period_start: string | null;
    period_end: string | null;
    issued_at: string;
    paid_at: string | null;
    voided_at: string | null;
}

export declare interface InvoiceDetailResponse {
    invoice: Invoice;
    items: InvoiceItem[];
}

export declare type InvoiceGateway = 'stripe' | 'razorpay';

export declare interface InvoiceItem {
    id: string;
    invoice_id: string;
    kind: InvoiceItemKind;
    description: string;
    quantity: number;
    unit_amount_minor: number;
    amount_minor: number;
    plan_id: string | null;
    credit_transaction_id: string | null;
}

export declare type InvoiceItemKind = 'topup' | 'discount' | 'tax_line' | 'adjustment';

export declare type InvoiceKind = 'topup' | 'adjustment';

export declare interface InvoiceListResponse {
    invoices: Invoice[];
    next_cursor: string | null;
}

export declare type InvoiceStatus = 'paid' | 'failed' | 'pending' | 'void' | 'refunded';

/**
 * Single embedded chunk produced by the ingestion pipeline.
 * Returned by the runtime knowledge_search tool with a similarity score.
 */
export declare interface KnowledgeChunk {
    id: string;
    source_id: string;
    agent_id: string;
    tenant_id: string;
    chunk_index: number;
    text: string;
    /** Cosine similarity in [0, 1]. Only present on retrieval results. */
    score?: number;
    bytes: number;
    created_at: string;
}

/**
 * A user-supplied knowledge unit attached to an agent. Chunked and
 * embedded into KnowledgeChunk rows for retrieval.
 */
export declare interface KnowledgeSource {
    id: string;
    agent_id: string;
    tenant_id: string;
    kind: KnowledgeSourceKind;
    title: string;
    /** URL when kind='url', filename when kind='file', null for kind='text'. */
    source_uri: string | null;
    status: KnowledgeSourceStatus;
    failure_reason: KnowledgeSourceFailureReason | string | null;
    /** SHA-256 of the raw source content. Used to detect stale chunks. */
    content_hash: string | null;
    /** Incremented on each successful re-ingest. */
    version: number;
    chunk_count: number;
    bytes: number;
    created_at: string;
    updated_at: string;
}

/**
 * Stable reason codes for knowledge source failure and quota enforcement.
 * UI copy lives separately; branch on these codes, not on message strings.
 */
declare type KnowledgeSourceFailureReason = 'fetch_failed' | 'extraction_failed' | 'embedding_failed' | 'quota_exceeded' | 'file_too_large' | 'unsupported_mime_type' | 'permission_denied' | 'storage_error' | 'unknown';

export declare type KnowledgeSourceKind = 'text' | 'url' | 'file';

/** Full lifecycle state for a knowledge source. */
export declare type KnowledgeSourceStatus = 'pending' | 'indexing' | 'ready' | 'failed';

export declare interface MachineDetectedEvent extends TelephonyBaseEvent {
    type: 'machine.detected';
    confidence: number;
    /** Whether a voicemail beep was also detected. */
    beepDetected: boolean;
}

declare interface MediaConnectedEvent extends TelephonyBaseEvent {
    type: 'media.connected';
    sampleRate: number;
    channels: number;
}

declare interface MediaDisconnectedEvent extends TelephonyBaseEvent {
    type: 'media.disconnected';
    reason: string;
}

export declare interface PostCallStructuredExtractionConfig {
    prompt: string | null;
    json_schema: Record<string, any> | null;
}

export declare interface RecordingCompletedEvent extends TelephonyBaseEvent {
    type: 'recording.completed';
    recordingId: string;
    durationMs: number;
    url?: string;
}

declare interface RecordingStartedEvent extends TelephonyBaseEvent {
    type: 'recording.started';
    recordingId: string;
}

/**
 * Public-facing labels for runtime reason codes the backend emits on call
 * records (`end_reason`, end-reason distributions, handoff metadata).
 *
 * The codes themselves are the source of truth in
 * `@rymi/agents-core/src/reasonCodes.ts`. This module is the UI label layer:
 * Studio, call detail, dashboards, and admin views map codes to copy here
 * instead of de-snake-casing the wire format on the fly.
 *
 * Rules:
 * - Adding/changing a public label is a UI copy change, never a contract
 *   change. The backend code remains untouched.
 * - Unknown codes fall back to a Title Case of the snake_case so legacy
 *   call rows still render readably.
 * - Labels stay short and declarative per `design.md` voice rules.
 */
/** Known session-close reasons rendered on call records. */
export declare type SessionEndReasonCode = 'end_call_tool' | 'handoff_to_human' | 'handoff_to_agent' | 'user_disconnect' | 'provider_disconnect' | 'error' | 'timeout' | 'closed';

export declare interface SetupQuestion {
    id: string;
    header: string;
    question: string;
    helper?: string;
    options: SetupQuestionOption[];
    multiSelect: boolean;
    writes: SetupWrite[];
    defaultValue?: string | string[];
    allowFreeText?: boolean;
    placeholder?: string;
    required: boolean;
    dependsOn?: {
        id: string;
        equals: string;
    };
}

declare interface SetupQuestionOption {
    label: string;
    description: string;
}

declare type SetupWrite = {
    kind: 'set';
    key: string;
} | {
    kind: 'append';
    key: string;
} | {
    kind: 'replace';
    key: string;
} | {
    kind: 'append-csv';
    key: string;
} | {
    kind: 'opener-template';
    token: string;
};

declare interface TelephonyBaseEvent {
    type: TelephonyEventType;
    timestampMs: number;
    /** Provider-specific raw event — for debugging only, never branch on this. */
    providerRaw?: unknown;
}

declare type TelephonyCallStatus = 'ringing' | 'answered' | 'in_progress' | 'completed' | 'failed' | 'busy' | 'no_answer' | 'canceled';

export declare type TelephonyEvent = CallStatusChangedEvent | MediaConnectedEvent | MediaDisconnectedEvent | DtmfReceivedEvent | MachineDetectedEvent | VoicemailBeepEvent | RecordingStartedEvent | RecordingCompletedEvent | TransferInitiatedEvent | TransferCompletedEvent | TransferFailedEvent | CapabilityUnsupportedEvent;

/**
 * Provider-neutral telephony event vocabulary.
 *
 * Transport packages (LiveKit, Twilio, browser, WebSocket) normalize their
 * provider-specific callbacks into this shared event model. Future
 * DTMF/voicemail/recording/machine-detection UI controls consume these
 * events without knowing the underlying provider.
 *
 * Rules:
 * - Use `TelephonyEventType` values in all transport adapters — never raw strings.
 * - Unsupported event types on a transport should emit `'capability.unsupported'`
 *   rather than silently dropping.
 * - `TelephonyCapabilityReport` lets callers discover what a transport can do
 *   without a runtime try/catch.
 */
export declare type TelephonyEventType = 'call.status_changed' | 'media.connected' | 'media.disconnected' | 'dtmf.received' | 'machine.detected' | 'voicemail.beep' | 'recording.started' | 'recording.completed' | 'transfer.initiated' | 'transfer.completed' | 'transfer.failed' | 'capability.unsupported';

export declare interface TelephonyLeg {
    id: string;
    call_id: string;
    participant_id: string;
    provider: 'plivo' | 'twilio' | 'vonage';
    provider_call_id?: string | null;
    direction: 'inbound' | 'outbound';
    status: string;
    from_number?: string | null;
    to_number?: string | null;
    cost: number;
    duration: number;
    metadata: Record<string, any>;
    created_at: string;
}

/**
 * Safe view of tool capability state for SDK/MCP responses.
 * Omits internal fields that expose tenant credential structure.
 */
export declare interface ToolCapabilitySafeView {
    toolId: string;
    available: boolean;
    unavailableReason: ToolUnavailableReason | null;
    sideEffect: 'read' | 'write';
}

/** What the tool does to the world — drives audit-logging requirements. */
export declare type ToolSideEffect = 'read' | 'write';

/** Stable reason codes for why a tool is unavailable on a given call. */
declare type ToolUnavailableReason = 'agent_tool_disabled' | 'missing_credential' | 'missing_caller_phone' | 'missing_telegram_chat_id' | 'missing_transfer_number' | 'blocked_by_mvp_policy' | 'not_supported_in_runtime' | 'provider_not_configured' | 'auth_error' | 'credential_expired' | 'context_missing' | 'policy_blocked' | 'plan_gate' | 'runtime_not_initialized' | 'rate_limited';

export declare interface TranscriptionResult {
    text: string;
    confidence: number | null;
    languageCode?: string | null;
    isFinal?: boolean;
    provider?: string | null;
    model?: string | null;
}

export declare interface TranscriptSegment {
    id?: string;
    speaker: CallTranscriptSpeaker;
    text: string;
    sequence: number;
    started_at_ms: number;
    ended_at_ms: number;
    is_final: boolean;
    source: string;
    created_at?: string;
}

export declare interface TransferCompletedEvent extends TelephonyBaseEvent {
    type: 'transfer.completed';
    target: string;
}

declare interface TransferFailedEvent extends TelephonyBaseEvent {
    type: 'transfer.failed';
    target: string;
    reason: string;
}

declare interface TransferInitiatedEvent extends TelephonyBaseEvent {
    type: 'transfer.initiated';
    target: string;
}

/** How the agent obtains a variable live when input/default did not satisfy it. */
declare type VariableAcquisition = 'ask' | 'extract' | 'none';

/** Where a variable was first authored (for Studio UX / badges). */
declare type VariableOrigin = 'caller' | 'playbook' | 'postcall' | 'prompt' | 'template';

declare interface VoicemailBeepEvent extends TelephonyBaseEvent {
    type: 'voicemail.beep';
}

export { }
