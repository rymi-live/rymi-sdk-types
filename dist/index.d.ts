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
    /** End-of-turn detection engine. 'smart-turn-v3' uses the audio endpointer; 'timer' relies on silence only. */
    turnEndpointer?: 'smart-turn-v3' | 'timer';
    waitAfterSentence?: number;
    waitAfterNoPunctuation?: number;
    waitAfterNumbers?: number;
    stt_confidence_threshold?: number;
    stt_numeral_formatting?: boolean;
    stt_profanity_filter?: boolean;
    stt_keywords?: string;
    /** Server-side noise suppression on inbound audio (Deepgram). */
    stt_background_denoising?: boolean;
    /** Deepgram Flux: confidence (0.5–0.9) required before committing end-of-turn. */
    stt_eot_confidence?: number;
    /** Deepgram Flux: max ms of silence before forcing end-of-turn. */
    stt_eot_timeout_ms?: number;
    /** AssemblyAI: minimum silence before detecting end-of-turn when confident. */
    stt_min_turn_silence_ms?: number;
    /** AssemblyAI: maximum silence before forcing end-of-turn. */
    stt_max_turn_silence_ms?: number;
    /** Soniox: strongly prefer the agent's language instead of 60+ auto-detect. */
    stt_strict_language?: boolean;
    /** Soniox: max ms delay before confirming a final utterance. */
    stt_endpoint_delay_ms?: number;
    /** Soniox: comma-separated custom vocabulary terms. */
    stt_custom_vocabulary?: string;
    /** Soniox: domain/context hints ("key: value" per line) to guide transcription. */
    stt_context?: string;
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
    /** Emotion/affect steering: when the caller's sensed affect (arousal/valence
     *  from the affect-engine) is injected into the LLM prompt so the agent adapts
     *  its tone. Per-agent opt-in that overrides the global `RYMI_AFFECT_STEERING`
     *  gateway flag — set `enabled: true` on one pilot agent to trial input-side
     *  emotional awareness without turning it on for all traffic. Requires the
     *  affect-engine service to be reachable (AFFECT_ENGINE_URL). Stored in
     *  `agents.advanced_config` JSONB — no migration. Default off. */
    affectSteering?: {
        enabled?: boolean;
    };
    /** Inline non-verbal TTS markers: when enabled AND the agent's synthesizer
     *  renders them (Fish s2 only today), the model is instructed it may emit
     *  bracketed cues like `[laughs]`/`[sighs]` inline, and the TTS text filter
     *  stops stripping them so they reach the synthesizer as real vocalizations.
     *  Per-agent opt-in so it pilots on ONE Fish agent — every other provider
     *  would speak the bracket literally, so the flag is a no-op there (the synth
     *  capability gate keeps stripping on). Stored in `agents.advanced_config`
     *  JSONB — no migration. Default off. */
    nonVerbalMarkers?: {
        enabled?: boolean;
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
    /** Optional: business vertical override (falls back to the tenant default). */
    businessType?: string;
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
    turnEndpointer?: 'smart-turn-v3' | 'timer';
    waitAfterSentence: number;
    waitAfterNoPunctuation: number;
    waitAfterNumbers: number;
    stt_confidence_threshold: number;
    stt_numeral_formatting: boolean;
    stt_profanity_filter: boolean;
    stt_keywords: string;
    stt_background_denoising: boolean;
    stt_eot_confidence?: number;
    stt_eot_timeout_ms?: number;
    stt_min_turn_silence_ms?: number;
    stt_max_turn_silence_ms?: number;
    stt_strict_language?: boolean;
    stt_endpoint_delay_ms?: number;
    stt_custom_vocabulary?: string;
    stt_context?: string;
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
    sourceTemplateId?: string | null;
    agent_kind?: 'managed' | 'custom' | null;
    managed_sku_id?: string | null;
}

/** Feature flags for recording, transcription, and consent. */
export declare interface AgentFeatures {
    recording_enabled?: boolean;
    transcription_enabled?: boolean;
    require_consent?: boolean;
    /** Stored recording file format (in-house recorder). Resolved at record time. */
    recording_format?: 'mp3' | 'wav' | 'opus';
    /** Channel layout: mixed mono, or dual-channel (caller left / agent right). */
    recording_channels?: 'mixed' | 'dual';
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
    /** Business vertical (e.g. "Real estate"). Per-agent override of the tenant default. */
    businessType?: string;
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
    voiceOptions?: TemplateVoiceOption[];
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
    /**
     * Curated managed-stack SKU this template is assigned to. Every official
     * template maps to exactly one `managed_agent_skus.id`; agents created from
     * the template are Rymi-curated (agent_kind='managed') with the SKU's locked
     * stack + price. The persona content comes from the template; the model
     * stack + price come from the assigned SKU. Several templates may share a
     * SKU. Undefined → the template seeds a custom (unlocked) agent.
     */
    managedSkuId?: string;
    /**
     * Per-language overrides of caller-facing persona fields, keyed by locale
     * (e.g. 'hi-IN'). applyTemplateDefaults layers the matching locale's override
     * over the base (English) defaults when the agent's language matches. Localise
     * what the caller hears — opener, qualificationFlow questions, scripts,
     * objections; internal directives (successCriteria, escalationRule, offLimits,
     * CTAs) are typically left as authored since they instruct the model, not the
     * caller. Indic SKUs resolve to 'hi-IN', so a hi-IN override serves both.
     */
    localeOverrides?: Record<string, Partial<Omit<AgentTemplateDefaults, 'localeOverrides'>>>;
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
    /**
     * Canonical system-variable key this variable mirrors (e.g. `company_name`,
     * `agent_name`). When set, the variable resolves to that system value, so a
     * custom key like `{{clinic_name}}` fills with the business name without the
     * agent asking. Takes effect after metadata (metadata still wins on collision)
     * and before `default`. Empty/undefined ⇒ no mapping.
     */
    systemAlias?: string;
}

/** Allowed value-type for a caller variable. Absent ⇒ treated as 'string'. */
declare type AgentVariableType = 'string' | 'number' | 'boolean' | 'enum';

export declare interface AgentVoiceConfig {
    voiceId?: string;
    language?: string;
    accent?: string;
    bargeInEnabled?: boolean;
}

declare type AiDisclosureMode = 'off' | 'agent' | 'attested';

export declare type BuiltinAgentToolId = 'handoff_to_human' | 'check_calendar_availability' | 'list_calendar_events' | 'create_calendar_event' | 'update_calendar_event' | 'delete_calendar_event' | 'lookup_customer' | 'send_whatsapp_message' | 'send_telegram_message' | 'send_asset' | 'call_webhook' | 'create_ticket' | 'lookup_ticket';

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

/** Permitted calling hours in a fixed IANA timezone. Calls are allowed while the
 *  local hour is in [start_hour, end_hour). For India recovery/collections
 *  conduct (RBI: no contact before 08:00 or after 19:00) set
 *  { start_hour: 8, end_hour: 19, timezone: 'Asia/Kolkata' }. */
declare interface CallingWindow {
    /** 0–23, inclusive. */
    start_hour: number;
    /** 1–24, exclusive (calls allowed while local hour < end_hour). */
    end_hour: number;
    /** IANA zone the window is evaluated in, e.g. 'Asia/Kolkata'. */
    timezone: string;
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

/** An outbound/inbound calling campaign against a tenant's agent. */
export declare interface Campaign {
    id: string;
    tenant_id: string;
    user_id?: string | null;
    agent_id: string;
    /** Snapshot recorded at launch; attribution only (track, not pin). */
    agent_snapshot_id?: string | null;
    type: CampaignType;
    name: string;
    goal: CampaignGoal;
    status: CampaignStatus;
    schedule_policy: Record<string, unknown>;
    retry_policy: Record<string, unknown>;
    concurrency_policy: Record<string, unknown>;
    automation_policy: Record<string, unknown>;
    reporting_policy: Record<string, unknown>;
    compliance_policy: Record<string, unknown>;
    post_call_config_override?: Record<string, unknown> | null;
    stat_members: number;
    stat_suppressed: number;
    stat_attempts: number;
    stat_answered: number;
    stat_completed: number;
    stat_failed: number;
    stat_no_answer: number;
    stat_voicemail: number;
    stat_goal_successes: number;
    stat_callbacks: number;
    stat_opt_outs: number;
    stat_followups_sent: number;
    stat_handoffs: number;
    stat_duration_seconds: number;
    stat_customer_cost_cents: number;
    stat_provider_cost_micros: number;
    /** Auto-pause backstop: consecutive whole-sweep rejection count. */
    consecutive_rejection_sweeps: number;
    metadata: Record<string, unknown>;
    launched_at?: string | null;
    paused_at?: string | null;
    completed_at?: string | null;
    created_at: string;
    updated_at: string;
}

/** One per dial; correlates 1:1 with (at most) one `calls` row. */
export declare interface CampaignAttempt {
    id: string;
    tenant_id: string;
    campaign_id: string;
    campaign_batch_id?: string | null;
    campaign_member_id?: string | null;
    call_id?: string | null;
    attempt_number: number;
    status: CampaignAttemptStatus;
    outcome?: CampaignAttemptOutcome | string | null;
    /** Snapshot actually served (attribution). */
    agent_snapshot_id?: string | null;
    scheduled_at?: string | null;
    started_at?: string | null;
    completed_at?: string | null;
    next_action?: Record<string, unknown> | null;
    next_action_at?: string | null;
    error_code?: string | null;
    error_detail?: string | null;
    /** campaignId:memberId:attemptNumber */
    idempotency_key: string;
    metadata: Record<string, unknown>;
    created_at: string;
    updated_at: string;
}

/** Outcome codes recorded once an attempt resolves. */
declare type CampaignAttemptOutcome = 'goal_success' | 'goal_fail' | 'no_answer' | 'busy' | 'voicemail' | 'error';

declare type CampaignAttemptStatus = 'scheduled' | 'queued' | 'dialing' | 'ringing' | 'in_progress' | 'completed' | 'failed' | 'skipped' | 'cancelled';

export declare interface CampaignCompliancePolicy {
    require_consent: ConsentRequirement;
    require_consent_evidence: boolean;
    /** null = uncapped. */
    max_attempts_per_24h: number | null;
    ai_disclosure: AiDisclosureMode;
    dnc_scrub: DncScrubMode;
    /** null = no time-of-day restriction (calls allowed any hour). */
    calling_window?: CallingWindow | null;
}

/**
 * Defines what "success" means for a campaign, evaluated against post-call
 * structured extraction / evaluation results.
 */
export declare interface CampaignGoal {
    goal_type: string;
    success_field: string;
    success_when: Record<string, unknown>;
    secondary_fields?: string[];
    human_label: string;
}

/** Answer rate bucketed by hour-of-day (0-23, local to the campaign's timezone). */
declare interface CampaignHourlyAnswerRate {
    hour: number;
    attempted: number;
    answered: number;
    answer_rate: number;
}

/** Per-campaign membership state for a contact. */
export declare interface CampaignMember {
    id: string;
    tenant_id: string;
    campaign_id: string;
    contact_id: string;
    status: CampaignMemberStatus;
    suppression_reason?: CampaignMemberSuppressionReason | string | null;
    attempt_count: number;
    last_attempt_at?: string | null;
    next_attempt_at: string;
    outcome?: string | null;
    variables_override: Record<string, string>;
    created_at: string;
    updated_at: string;
}

declare type CampaignMemberStatus = 'ready' | 'queued' | 'in_progress' | 'succeeded' | 'failed' | 'exhausted' | 'opted_out' | 'suppressed';

declare type CampaignMemberSuppressionReason = 'dnc' | 'no_consent' | 'invalid_phone' | 'duplicate' | 'manual';

declare interface CampaignOutcomeBreakdownEntry {
    outcome: string;
    count: number;
}

/** Shape returned by GET /campaigns/:id/report. */
export declare interface CampaignReport {
    summary: CampaignReportSummary;
    distributions: CampaignReportDistributions;
}

declare interface CampaignReportDistributions {
    by_outcome: CampaignOutcomeBreakdownEntry[];
    by_sentiment: CampaignSentimentBreakdownEntry[];
    by_hour: CampaignHourlyAnswerRate[];
    by_snapshot: CampaignSnapshotBreakdownEntry[];
}

/** Summary header — mirrors the campaigns.stat_* counters 1:1. */
declare interface CampaignReportSummary {
    stat_members: number;
    stat_suppressed: number;
    stat_attempts: number;
    stat_answered: number;
    stat_completed: number;
    stat_failed: number;
    stat_no_answer: number;
    stat_voicemail: number;
    stat_goal_successes: number;
    stat_callbacks: number;
    stat_opt_outs: number;
    stat_followups_sent: number;
    stat_handoffs: number;
    stat_duration_seconds: number;
    stat_customer_cost_cents: number;
    stat_provider_cost_micros: number;
}

declare interface CampaignSentimentBreakdownEntry {
    sentiment: string;
    count: number;
}

/** Outcome distribution attributed to a specific agent snapshot (A/B tracking). */
declare interface CampaignSnapshotBreakdownEntry {
    agent_snapshot_id: string;
    attempts: number;
    goal_successes: number;
}

export declare type CampaignStatus = 'draft' | 'scheduled' | 'running' | 'paused' | 'completed' | 'failed' | 'archived';

export declare type CampaignType = 'outbound' | 'inbound';

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

declare type ConsentRequirement = 'none' | 'voice' | 'all';

/** Tenant-level contact, deduped by (tenant_id, phone). */
export declare interface Contact {
    id: string;
    tenant_id: string;
    /** E.164 normalized. */
    phone?: string | null;
    email?: string | null;
    name?: string | null;
    timezone?: string | null;
    language?: string | null;
    tags: string[];
    custom_fields: Record<string, unknown>;
    /** Per-channel consent flags, e.g. { voice: true, sms: false }. */
    consent: Record<string, boolean>;
    source?: ContactSource | string | null;
    created_at: string;
    updated_at: string;
}

/** Where a contact record originated. */
declare type ContactSource = 'csv_import' | 'api' | 'inbound_call' | 'crm';

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

declare type DncScrubMode = 'none' | 'internal' | 'attested';

declare interface DtmfReceivedEvent extends TelephonyBaseEvent {
    type: 'dtmf.received';
    digit: string;
}

export declare type FollowupKind = 'call' | 'sms' | 'whatsapp' | 'telegram' | 'webhook' | 'human_handoff_task' | 'mark_dnc';

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

declare interface TemplateVoiceOption {
    templateId: string;
    skuId: string;
    locale: string;
    provider: string;
    modelId: string;
    voiceId: string;
    label?: string;
    rank: number;
    isDefault: boolean;
    sourceType?: TemplateVoiceSourceType;
    rightsStatus?: TemplateVoiceRightsStatus;
    commercialAllowed?: boolean;
    sourceUrl?: string | null;
    consentAttestationUrl?: string | null;
    notes?: string | null;
    personaTags?: string[];
    languageTags?: string[];
    accentTags?: string[];
}

declare type TemplateVoiceRightsStatus = 'verified' | 'unverified' | 'restricted';

declare type TemplateVoiceSourceType = 'fish_public' | 'licensed_clone' | 'owned_clone';

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
