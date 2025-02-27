import BigNumber from 'bignumber.js';
import { OpKind } from './opkind';

export type BalanceResponse = BigNumber;
export type StorageResponse = ScriptedContracts['storage'];
export type ScriptResponse = ScriptedContracts;
export type BigMapGetResponse = MichelsonV1Expression;
export type ManagerResponse = { manager: string };
export type ManagerKeyResponse = string | { key: string };
export type DelegateResponse = string | null;

export type OperationHash = string;

export interface DelegatesResponse {
  balance: BigNumber;
  frozen_balance: BigNumber;
  frozen_balance_by_cycle: Frozenbalancebycycle[];
  staking_balance: BigNumber;
  delegated_contracts: string[];
  delegated_balance: BigNumber;
  deactivated: boolean;
  grace_period: number;
  voting_power?: number;
}

interface Frozenbalancebycycle {
  cycle: number;
  deposit?: BigNumber;
  deposits?: BigNumber; // Since Granada, "deposit" is replaced by "deposits"
  fees: BigNumber;
  rewards: BigNumber;
}

export type BigMapKey = {
  key: { [key: string]: string | object[] };
  type: { prim: string; args?: object[] };
};

export interface BlockFullHeader {
  level: number;
  proto: number;
  predecessor: string;
  timestamp: TimeStampMixed;
  validation_pass: number;
  operations_hash: string;
  fitness: string[];
  context: string;
  priority: number;
  proof_of_work_nonce: string;
  seed_nonce_hash?: string;
  signature: string;
}

export type InlinedEndorsementKindEnum = OpKind.ENDORSEMENT;

export interface InlinedEndorsementContents {
  kind: InlinedEndorsementKindEnum;
  level: number;
}

export interface InlinedEndorsement {
  branch: string;
  operations: InlinedEndorsementContents;
  signature?: string;
}

export type OperationContentsBallotEnum = 'nay' | 'yay' | 'pass';

export interface OperationContentsEndorsement {
  kind: OpKind.ENDORSEMENT;
  level: number;
}

export interface OperationContentsEndorsementWithSlot {
  kind: OpKind.ENDORSEMENT_WITH_SLOT;
  endorsement: InlinedEndorsement;
  slot: number;
}

export interface OperationContentsFailingNoop {
  kind: OpKind.FAILING_NOOP;
  arbitrary: string;
}

export interface OperationContentsRevelation {
  kind: OpKind.SEED_NONCE_REVELATION;
  level: number;
  nonce: string;
}

export interface OperationContentsDoubleEndorsement {
  kind: OpKind.DOUBLE_ENDORSEMENT_EVIDENCE;
  op1: InlinedEndorsement;
  op2: InlinedEndorsement;
  slot?: number;
}

export interface OperationContentsDoubleBaking {
  kind: OpKind.DOUBLE_BAKING_EVIDENCE;
  bh1: BlockFullHeader;
  bh2: BlockFullHeader;
}

export interface OperationContentsActivateAccount {
  kind: OpKind.ACTIVATION;
  pkh: string;
  secret: string;
}

export interface OperationContentsProposals {
  kind: OpKind.PROPOSALS;
  source: string;
  period: number;
  proposals: string[];
}

export interface OperationContentsBallot {
  kind: OpKind.BALLOT;
  source: string;
  period: number;
  proposal: string;
  ballot: OperationContentsBallotEnum;
}

export interface OperationContentsReveal {
  kind: OpKind.REVEAL;
  source: string;
  fee: string;
  counter: string;
  gas_limit: string;
  storage_limit: string;
  public_key: string;
}

export interface OperationContentsTransaction {
  kind: OpKind.TRANSACTION;
  source: string;
  fee: string;
  counter: string;
  gas_limit: string;
  storage_limit: string;
  amount: string;
  destination: string;
  parameters?: TransactionOperationParameter;
}

export interface OperationContentsOrigination {
  kind: OpKind.ORIGINATION;
  source: string;
  fee: string;
  counter: string;
  gas_limit: string;
  storage_limit: string;
  balance: string;
  delegate?: string;
  script?: ScriptedContracts;
}

export interface OperationContentsDelegation {
  kind: OpKind.DELEGATION;
  source: string;
  fee: string;
  counter: string;
  gas_limit: string;
  storage_limit: string;
  delegate?: string;
}

export interface OperationContentsRegisterGlobalConstant {
  kind: OpKind.REGISTER_GLOBAL_CONSTANT;
  source: string;
  fee: string;
  counter: string;
  gas_limit: string;
  storage_limit: string;
  value: MichelsonV1Expression;
}

export type OperationContents =
  | OperationContentsEndorsement
  | OperationContentsRevelation
  | OperationContentsDoubleEndorsement
  | OperationContentsDoubleBaking
  | OperationContentsActivateAccount
  | OperationContentsProposals
  | OperationContentsBallot
  | OperationContentsReveal
  | OperationContentsTransaction
  | OperationContentsOrigination
  | OperationContentsDelegation
  | OperationContentsEndorsementWithSlot
  | OperationContentsFailingNoop
  | OperationContentsRegisterGlobalConstant;

export interface OperationContentsAndResultMetadataExtended {
  balance_updates: OperationMetadataBalanceUpdates[];
  delegate: string;
  slots: number[];
}

export interface OperationContentsAndResultMetadataReveal {
  balance_updates: OperationMetadataBalanceUpdates[];
  operation_result: OperationResultReveal;
  internal_operation_results?: InternalOperationResult[];
}

export interface OperationContentsAndResultMetadataTransaction {
  balance_updates: OperationMetadataBalanceUpdates[];
  operation_result: OperationResultTransaction;
  internal_operation_results?: InternalOperationResult[];
}

export interface OperationContentsAndResultMetadataDelegation {
  balance_updates: OperationMetadataBalanceUpdates[];
  operation_result: OperationResultDelegation;
  internal_operation_results?: InternalOperationResult[];
}

export interface OperationContentsAndResultMetadataRegisterGlobalConstant {
  balance_updates: OperationMetadataBalanceUpdates[];
  operation_result: OperationResultRegisterGlobalConstant;
  internal_operation_results?: InternalOperationResult[];
}

export interface OperationContentsAndResultMetadata {
  balance_updates: OperationMetadataBalanceUpdates[];
}

export interface OperationContentsAndResultEndorsement {
  kind: OpKind.ENDORSEMENT;
  level: number;
  metadata: OperationContentsAndResultMetadataExtended;
}

export interface OperationContentsAndResultEndorsementWithSlot {
  kind: OpKind.ENDORSEMENT_WITH_SLOT;
  endorsement: InlinedEndorsement;
  slot: number;
  metadata: OperationContentsAndResultMetadataExtended;
}

export interface OperationContentsAndResultRevelation {
  kind: OpKind.SEED_NONCE_REVELATION;
  level: number;
  nonce: string;
  metadata: OperationContentsAndResultMetadata;
}

export interface OperationContentsAndResultDoubleEndorsement {
  kind: OpKind.DOUBLE_ENDORSEMENT_EVIDENCE;
  op1: InlinedEndorsement;
  op2: InlinedEndorsement;
  slot?: number;
  metadata: OperationContentsAndResultMetadata;
}

export interface OperationContentsAndResultDoubleBaking {
  kind: OpKind.DOUBLE_BAKING_EVIDENCE;
  bh1: BlockFullHeader;
  bh2: BlockFullHeader;
  metadata: OperationContentsAndResultMetadata;
}

export interface OperationContentsAndResultActivateAccount {
  kind: OpKind.ACTIVATION;
  pkh: string;
  secret: string;
  metadata: OperationContentsAndResultMetadata;
}

export interface OperationContentsAndResultProposals {
  kind: OpKind.PROPOSALS;
  source: string;
  period: number;
  proposals: string[];
}

export interface OperationContentsAndResultBallot {
  kind: OpKind.BALLOT;
  source: string;
  period: number;
  proposal: string;
  ballot: OperationContentsBallotEnum;
}

export interface OperationContentsAndResultReveal {
  kind: OpKind.REVEAL;
  source: string;
  fee: string;
  counter: string;
  gas_limit: string;
  storage_limit: string;
  public_key: string;
  metadata: OperationContentsAndResultMetadataReveal;
}

export interface OperationContentsAndResultTransaction {
  kind: OpKind.TRANSACTION;
  source: string;
  fee: string;
  counter: string;
  gas_limit: string;
  storage_limit: string;
  amount: string;
  destination: string;
  parameters?: TransactionOperationParameter;
  metadata: OperationContentsAndResultMetadataTransaction;
}

export interface OperationContentsAndResultDelegation {
  kind: OpKind.DELEGATION;
  source: string;
  fee: string;
  counter: string;
  gas_limit: string;
  storage_limit: string;
  delegate?: string;
  metadata: OperationContentsAndResultMetadataDelegation;
}

export interface OperationContentsAndResultRegisterGlobalConstant {
  kind: OpKind.REGISTER_GLOBAL_CONSTANT;
  source: string;
  fee: string;
  counter: string;
  gas_limit: string;
  storage_limit: string;
  value: MichelsonV1Expression;
  metadata: OperationContentsAndResultMetadataRegisterGlobalConstant
}

export type OperationContentsAndResult =
  | OperationContentsAndResultEndorsement
  | OperationContentsAndResultRevelation
  | OperationContentsAndResultDoubleEndorsement
  | OperationContentsAndResultDoubleBaking
  | OperationContentsAndResultActivateAccount
  | OperationContentsAndResultProposals
  | OperationContentsAndResultBallot
  | OperationContentsAndResultReveal
  | OperationContentsAndResultTransaction
  | OperationContentsAndResultOrigination
  | OperationContentsAndResultDelegation
  | OperationContentsAndResultEndorsementWithSlot
  | OperationContentsAndResultRegisterGlobalConstant;

export interface OperationEntry {
  protocol: string;
  chain_id: string;
  hash: string;
  branch: string;
  contents: (OperationContents | OperationContentsAndResult)[];
  signature?: string;
}

export interface BlockResponse {
  protocol: string;
  chain_id: string;
  hash: string;
  header: BlockFullHeader;
  metadata: BlockMetadata;
  operations: OperationEntry[][];
}

export type BakingRightsArgumentsDelegate = string | string[];
export type BakingRightsArgumentsCycle = number | number[];
export type BakingRightsArgumentsLevel = number | number[];

export interface BakingRightsQueryArguments {
  level?: BakingRightsArgumentsLevel;
  cycle?: BakingRightsArgumentsCycle;
  delegate?: BakingRightsArgumentsDelegate;
  max_priority?: number;
  all?: null;
}

export interface BakingRightsResponseItem {
  level: number;
  delegate: string;
  priority: number;
  estimated_time?: Date;
}

export type BakingRightsResponse = BakingRightsResponseItem[];

export type EndorsingRightsArgumentsDelegate = string | string[];
export type EndorsingRightsArgumentsCycle = number | number[];
export type EndorsingRightsArgumentsLevel = number | number[];

export interface EndorsingRightsQueryArguments {
  level?: EndorsingRightsArgumentsLevel;
  cycle?: EndorsingRightsArgumentsCycle;
  delegate?: EndorsingRightsArgumentsDelegate;
}

export interface EndorsingRightsResponseItem {
  level: number;
  delegate: string;
  slots: number[];
  estimated_time?: Date;
}

export type EndorsingRightsResponse = EndorsingRightsResponseItem[];

export type BallotListResponseEnum = 'nay' | 'yay' | 'pass';

export interface BallotListResponseItem {
  pkh: string;
  ballot: BallotListResponseEnum;
}

export type BallotListResponse = BallotListResponseItem[];

export interface BallotsResponse {
  yay: number;
  nay: number;
  pass: number;
}

export type PeriodKindResponse =
  | 'proposal'
  | 'testing_vote'
  | 'testing'
  | 'promotion_vote'
  | 'exploration'
  | 'cooldown'
  | 'promotion'
  | 'adoption';

export type CurrentProposalResponse = string | null;

export type CurrentQuorumResponse = number;

export interface VotesListingsResponseItem {
  pkh: string;
  rolls: number;
}

export type VotesListingsResponse = VotesListingsResponseItem[];

export type ProposalsResponseItem = [string, number];

export type ProposalsResponse = ProposalsResponseItem[];

export interface RawBlockHeaderResponse {
  protocol: string;
  chain_id: string;
  hash: string;
  level: number;
  proto: number;
  predecessor: string;
  timestamp: string;
  validation_pass: number;
  operations_hash: string;
  fitness: string[];
  context: string;
  priority: number;
  proof_of_work_nonce: string;
  signature: string;
}

export interface BlockHeaderResponse {
  protocol: string;
  chain_id: string;
  hash: string;
  level: number;
  proto: number;
  predecessor: string;
  timestamp: string;
  validation_pass: number;
  operations_hash: string;
  fitness: string[];
  context: string;
  priority: number;
  proof_of_work_nonce: string;
  signature: string;
}

export interface PackDataParams {
  data: MichelsonV1Expression;
  type: MichelsonV1Expression;
  gas?: BigNumber;
}

export type HexString = string;

export interface PackDataResponse {
  packed: HexString;
  gas?: BigNumber | 'unaccounted';
}

export type BigMapResponse = MichelsonV1Expression | MichelsonV1Expression[];

export type SaplingDiffResponse = {
  root: SaplingTransactionCommitmentHash;
  commitments_and_ciphertexts: CommitmentsAndCiphertexts[];
  nullifiers: string[];
};

export type SaplingTransactionCommitmentHash = string;

export type PreapplyParams = OperationObject[];
export type PreapplyResponse = {
  contents: OperationContentsAndResult[];
};

export type ForgeOperationsParams = Pick<OperationObject, 'branch' | 'contents'>;

export type TimeStampMixed = Date | string;

export type BalanceUpdateKindEnum = 'contract' | 'freezer';
export type BalanceUpdateCategoryEnum = 'rewards' | 'fees' | 'deposits';

export interface MichelsonV1ExpressionBase {
  int?: string;
  string?: string;
  bytes?: string;
}

export interface MichelsonV1ExpressionExtended {
  prim: string;
  args?: MichelsonV1Expression[];
  annots?: string[];
}

export type MichelsonV1Expression =
  | MichelsonV1ExpressionBase
  | MichelsonV1ExpressionExtended
  | MichelsonV1Expression[];

export interface ScriptedContracts {
  code: MichelsonV1Expression[];
  storage: MichelsonV1Expression;
}

export interface OperationBalanceUpdatesItem {
  kind: BalanceUpdateKindEnum;
  category?: BalanceUpdateCategoryEnum;
  delegate?: string;
  cycle?: number;
  contract?: string;
  change: string;
  origin?: MetadataBalanceUpdatesOriginEnum;
}

export type OperationBalanceUpdates = OperationBalanceUpdatesItem[];

export interface OperationObject {
  branch?: string;
  contents?: OperationContents[];
  protocol?: string;
  signature?: string;
}

export type InternalOperationResultKindEnum =
  | OpKind.REVEAL
  | OpKind.TRANSACTION
  | OpKind.ORIGINATION
  | OpKind.DELEGATION
  | OpKind.REGISTER_GLOBAL_CONSTANT;

export type SuccessfulManagerOperationResultKindEnum =
  | OpKind.REVEAL
  | OpKind.TRANSACTION
  | OpKind.ORIGINATION
  | OpKind.DELEGATION;

export type InternalOperationResultEnum =
  | OperationResultReveal
  | OperationResultTransaction
  | OperationResultDelegation
  | OperationResultOrigination
  | OperationResultRegisterGlobalConstant;

export interface OperationResultDelegation {
  status: OperationResultStatusEnum;
  consumed_gas?: string;
  errors?: TezosGenericOperationError[];
  consumed_milligas?: string;
}

export interface OperationResultRegisterGlobalConstant {
  status: OperationResultStatusEnum;
  balance_updates?: OperationBalanceUpdates;
  consumed_gas?: string;
  storage_size?: string;
  global_address?: string;
  errors?: TezosGenericOperationError[];
}

export interface ContractBigMapDiffItem {
  key_hash?: string;
  key?: MichelsonV1Expression;
  value?: MichelsonV1Expression;
  action?: DiffActionEnum;
  big_map?: string;
  source_big_map?: string;
  destination_big_map?: string;
  key_type?: MichelsonV1Expression;
  value_type?: MichelsonV1Expression;
}

export type ContractBigMapDiff = ContractBigMapDiffItem[];

export interface TezosGenericOperationError {
  kind: string;
  id: string;
}

export interface OperationResultTransaction {
  status: OperationResultStatusEnum;
  storage?: MichelsonV1Expression;
  big_map_diff?: ContractBigMapDiff;
  balance_updates?: OperationBalanceUpdates;
  originated_contracts?: string[];
  consumed_gas?: string;
  storage_size?: string;
  paid_storage_size_diff?: string;
  allocated_destination_contract?: boolean;
  errors?: TezosGenericOperationError[];
  consumed_milligas?: string;
  lazy_storage_diff?: LazyStorageDiff[];
}

export interface OperationResultReveal {
  status: OperationResultStatusEnum;
  consumed_gas?: string;
  errors?: TezosGenericOperationError[];
  consumed_milligas?: string;
}

export interface TransactionOperationParameter {
  entrypoint: string;
  value: MichelsonV1Expression;
}

export interface InternalOperationResult {
  kind: InternalOperationResultKindEnum;
  source: string;
  nonce: number;
  amount?: string;
  destination?: string;
  parameters?: TransactionOperationParameter;
  public_key?: string;
  balance?: string;
  delegate?: string;
  script?: ScriptedContracts;
  value?: MichelsonV1Expression;
  result: InternalOperationResultEnum;
}

export interface SuccessfulManagerOperationResult {
  kind: SuccessfulManagerOperationResultKindEnum;
  consumed_gas?: string;
  consumed_milligas?: string;
  storage?: MichelsonV1Expression;
  big_map_diff?: ContractBigMapDiff;
  balance_updates?: OperationBalanceUpdates;
  originated_contracts?: string[];
  storage_size?: string;
  paid_storage_size_diff?: string;
  lazy_storage_diff?: LazyStorageDiff[];
}

export type MetadataBalanceUpdatesKindEnum = 'contract' | 'freezer';
export type MetadataBalanceUpdatesCategoryEnum = 'rewards' | 'fees' | 'deposits';
export type MetadataBalanceUpdatesOriginEnum = 'block' | 'migration' | 'subsidy';

export interface OperationMetadataBalanceUpdates {
  kind: MetadataBalanceUpdatesKindEnum;
  category?: MetadataBalanceUpdatesCategoryEnum;
  contract?: string;
  delegate?: string;
  cycle?: number;
  change: string;
  origin?: MetadataBalanceUpdatesOriginEnum;
}

export type OperationResultStatusEnum = 'applied' | 'failed' | 'skipped' | 'backtracked';

export type DiffActionEnum = 'update' | 'remove' | 'copy' | 'alloc';

export type LazyStorageDiff = LazyStorageDiffBigMap | LazyStorageDiffSaplingState;

export interface LazyStorageDiffBigMap {
  kind: 'big_map';
  id: string;
  diff: LazyStorageDiffBigMapItems;
}

export interface LazyStorageDiffSaplingState {
  kind: 'sapling_state';
  id: string;
  diff: LazyStorageDiffSaplingStateItems;
}

export interface LazyStorageDiffBigMapItems {
  action: DiffActionEnum;
  updates?: LazyStorageDiffUpdatesBigMap[];
  source?: string;
  key_type?: MichelsonV1Expression;
  value_type?: MichelsonV1Expression;
}

export interface LazyStorageDiffSaplingStateItems {
  action: DiffActionEnum;
  updates?: LazyStorageDiffUpdatesSaplingState;
  source?: string;
  memo_size?: number;
}

export interface LazyStorageDiffUpdatesBigMap {
  key_hash: string;
  key: MichelsonV1Expression;
  value?: MichelsonV1Expression;
}

export type CommitmentsAndCiphertexts = [
  SaplingTransactionCommitment,
  SaplingTransactionCiphertext
];

export type SaplingTransactionCommitment = string;

export interface LazyStorageDiffUpdatesSaplingState {
  commitments_and_ciphertexts: CommitmentsAndCiphertexts[];
  nullifiers: string[];
}

export interface SaplingTransactionCiphertext {
  cv: string;
  epk: string;
  payload_enc: string;
  nonce_enc: string;
  payload_out: string;
  nonce_out: string;
}

export interface OperationResultOrigination {
  status: OperationResultStatusEnum;
  big_map_diff?: ContractBigMapDiff;
  balance_updates?: OperationBalanceUpdates;
  originated_contracts?: string[];
  consumed_gas?: string;
  storage_size?: string;
  paid_storage_size_diff?: string;
  errors?: TezosGenericOperationError[];
  consumed_milligas?: string;
  lazy_storage_diff?: LazyStorageDiff[];
}

export interface OperationContentsAndResultMetadataOrigination {
  balance_updates: OperationMetadataBalanceUpdates[];
  operation_result: OperationResultOrigination;
  internal_operation_results?: InternalOperationResult[];
}

export type ConstantsResponse = ConstantsResponseCommon &
  ConstantsResponseProto011 &
  ConstantsResponseProto010 &
  ConstantsResponseProto009 &
  ConstantsResponseProto008 &
  ConstantsResponseProto007 &
  ConstantsResponseProto006 &
  ConstantsResponseProto005 &
  ConstantsResponseProto004 &
  ConstantsResponseProto003 &
  ConstantsResponseProto001And002;

export interface ConstantsResponseCommon {
  proof_of_work_nonce_size: number;
  nonce_length: number;
  max_operation_data_length: number;
  preserved_cycles: number;
  blocks_per_cycle: number;
  blocks_per_commitment: number;
  blocks_per_roll_snapshot: number;
  blocks_per_voting_period: number;
  time_between_blocks: BigNumber[];
  endorsers_per_block: number;
  hard_gas_limit_per_operation: BigNumber;
  hard_gas_limit_per_block: BigNumber;
  proof_of_work_threshold: BigNumber;
  tokens_per_roll: BigNumber;
  michelson_maximum_type_size: number;
  seed_nonce_revelation_tip: BigNumber;
  block_security_deposit: BigNumber;
  endorsement_security_deposit: BigNumber;
  endorsement_reward: BigNumber | BigNumber[]; // BigNumber[] since proto 006, BigNumber before
  cost_per_byte: BigNumber;
  hard_storage_limit_per_operation: BigNumber;
}

export interface ConstantsResponseProto011
  extends Omit<ConstantsResponseProto010, 'michelson_maximum_type_size'> {
  max_micheline_node_count?: number;
  max_allowed_global_constants_depth?: number;
  max_micheline_bytes_limit?: number;
}
export interface ConstantsResponseProto010 extends ConstantsResponseProto007 {
  minimal_block_delay?: BigNumber;
  liquidity_baking_subsidy?: BigNumber;
  liquidity_baking_sunset_level?: number;
  liquidity_baking_escape_ema_threshold?: number;
}

export interface ConstantsResponseProto009 extends ConstantsResponseProto007 {}

export interface ConstantsResponseProto008 extends ConstantsResponseProto007 {}

export interface ConstantsResponseProto007
  extends Omit<ConstantsResponseProto006, 'max_revelations_per_block'> {
  max_anon_ops_per_block?: number;
}

export interface ConstantsResponseProto006 extends Omit<ConstantsResponseProto005, 'block_reward'> {
  baking_reward_per_endorsement?: BigNumber[];
}

export interface ConstantsResponseProto005 extends ConstantsResponseProto004 {
  quorum_min?: number;
  quorum_max?: number;
  min_proposal_quorum?: number;
  initial_endorsers?: number;
  delay_per_missing_endorsement?: BigNumber;
}

export interface ConstantsResponseProto004 extends ConstantsResponseProto003 {
  test_chain_duration?: BigNumber;
}

export interface ConstantsResponseProto003
  extends Omit<ConstantsResponseProto001And002, 'origination_burn'> {
  origination_size?: number;
  max_proposals_per_delegate?: number;
}

export interface ConstantsResponseProto001And002 {
  max_revelations_per_block?: number;
  origination_burn?: string;
  block_reward?: BigNumber;
}

export interface ContractResponse {
  balance: BigNumber;
  script: ScriptedContracts;
  counter?: string;
  delegate?: string;
}

export interface TestChainStatus {
  status: string;
}

export interface MaxOperationListLength {
  max_size: number;
  max_op?: number;
}

export interface Level {
  level: number;
  level_position: number;
  cycle: number;
  cycle_position: number;
  voting_period: number;
  voting_period_position: number;
  expected_commitment: boolean;
}

export interface LevelInfo {
  level: number;
  level_position: number;
  cycle: number;
  cycle_position: number;
  expected_commitment: boolean;
}

export interface BlockMetadata {
  protocol: string;
  next_protocol: string;
  test_chain_status: TestChainStatus;
  max_operations_ttl: number;
  max_operation_data_length: number;
  max_block_header_length: number;
  max_operation_list_length: MaxOperationListLength[];
  baker: string;
  level?: Level;
  level_info?: LevelInfo;
  voting_period_kind?: string;
  voting_period_info?: VotingPeriodBlockResult;
  nonce_hash?: any;
  consumed_gas: string;
  deactivated: any[];
  balance_updates: OperationBalanceUpdates;
  liquidity_baking_escape_ema?: number;
  implicit_operations_results?: SuccessfulManagerOperationResult[];
}

export type RPCRunOperationParam = {
  operation: OperationObject;
  chain_id: string;
};

export type RPCRunCodeParam = {
  script: MichelsonV1ExpressionExtended[];
  storage: MichelsonV1Expression;
  input: MichelsonV1Expression;
  amount: string;
  chain_id: string;
  source?: string;
  payer?: string;
  gas?: BigNumber;
  entrypoint?: string;
  balance?: string;
};

export type RunCodeResult = {
  storage: MichelsonV1Expression;
  operations: InternalOperationResult[];
  big_map_diff?: ContractBigMapDiff;
};

export type EntrypointsResponse = {
  entrypoints: { [key: string]: Object };
  unreachable?: { path: ('Left' | 'Right')[] };
};

export interface OperationContentsAndResultOrigination {
  kind: OpKind.ORIGINATION;
  source: string;
  fee: string;
  counter: string;
  gas_limit: string;
  storage_limit: string;
  balance: string;
  delegate?: string;
  script?: ScriptedContracts;
  metadata: OperationContentsAndResultMetadataOrigination;
}

export interface VotingPeriodResult {
  index: number;
  kind: string;
  start_position: number;
}

export interface VotingPeriodBlockResult {
  voting_period: VotingPeriodResult;
  position: number;
  remaining: number;
}

export type UnparsingModeEnum = 'Readable' | 'Optimized' | 'Optimized_legacy';
export type UnparsingMode = {
  unparsing_mode: UnparsingModeEnum;
};
