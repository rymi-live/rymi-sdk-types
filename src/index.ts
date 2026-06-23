// @rymi/sdk-types — the ONLY public type surface for Rymi SDKs.
//
// Rule: every export here is named and reviewed. NEVER use `export *`.
// Adding a symbol is a public API decision — check it against the denylist
// in docs/launch/2026-06-23-sdk-mirror-publishing-plan.md and against the
// leak-guard test in ./test/no-leak.test.ts before adding.

// --- Agent definition ---
export type {
    Agent,
    AgentConfig,
    AgentPayload,
    AgentVoiceConfig,
    AgentPersona,
    AgentCallerPersona,
    AgentVariable,
    AgentRequiredSlot,
    AgentPlaybook,
    AgentScript,
    AgentFeatures,
    AgentAdvancedConfig,
    AgentLlmProvider
} from '@rymi/shared-types';

// --- Calls ---
export type {
    Call,
    CallParticipant,
    CallStatus,
    CallParticipantRole,
    CallParticipantTransport,
    CallParticipantStatus,
    CallRecording,
    TelephonyLeg,
    TranscriptionResult,
    AgentRole
} from '@rymi/shared-types';

// --- Billing (invoices) ---
export type {
    Invoice,
    InvoiceItem,
    InvoiceListResponse,
    InvoiceDetailResponse,
    InvoiceStatus,
    InvoiceKind,
    InvoiceItemKind,
    InvoiceGateway
} from '@rymi/shared-types';

// --- Knowledge base ---
export type {
    KnowledgeSource,
    KnowledgeChunk,
    KnowledgeSourceKind,
    KnowledgeSourceStatus,
    CreateKnowledgeSourceRequest,
    CreateKnowledgeSourceTextRequest,
    CreateKnowledgeSourceUrlRequest
} from '@rymi/shared-types';

// --- Telephony webhook events ---
export type {
    TelephonyEvent,
    TelephonyEventType,
    CallStatusChangedEvent,
    RecordingCompletedEvent,
    TransferCompletedEvent,
    MachineDetectedEvent
} from '@rymi/shared-types';

// --- Agent templates ---
export type {
    AgentTemplate,
    AgentTemplateStatus,
    AgentTemplateVisibility,
    SetupQuestion
} from '@rymi/shared-types';

// --- Tools (safe views only) ---
export type {
    ToolCapabilitySafeView,
    ConnectorConnectionSafeView,
    BuiltinAgentToolId,
    AgentToolBinding,
    ToolSideEffect
} from '@rymi/shared-types';

// --- Post-call intelligence ---
export type {
    CallEvaluationResult,
    TranscriptSegment,
    CallSentiment,
    CallIntelligenceStatus,
    PostCallStructuredExtractionConfig
} from '@rymi/shared-types';

// --- Transcript + end-reason labels ---
export type { CallTranscriptEvent } from '@rymi/shared-types';
export type { SessionEndReasonCode } from '@rymi/shared-types';

// NOTE: This package is intentionally TYPE-ONLY. Runtime helpers are not
// re-exported from @rymi/shared-types because doing so pulls its
// side-effectful internal module graph (and business logic) into the public
// bundle. If a safe runtime utility is ever needed publicly, copy its source
// into this package deliberately and add a leak-guard assertion.
