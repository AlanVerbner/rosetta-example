declare namespace Components {
    namespace Schemas {
        /**
         * An AccountBalanceRequest is utilized to make a balance request on the /account/balance endpoint. If the block_identifier is populated, a historical balance query should be performed.
         */
        export interface AccountBalanceRequest {
            network_identifier: /* The network_identifier specifies which network a particular object is associated with. */ NetworkIdentifier;
            account_identifier: /* The account_identifier uniquely identifies an account within a network. All fields in the account_identifier are utilized to determine this uniqueness (including the metadata field, if populated). */ AccountIdentifier;
            block_identifier?: /* When fetching data by BlockIdentifier, it may be possible to only specify the index or hash. If neither property is specified, it is assumed that the client is making a request at the current block. */ PartialBlockIdentifier;
        }
        /**
         * An AccountBalanceResponse is returned on the /account/balance endpoint. If an account has a balance for each AccountIdentifier describing it (ex: an ERC-20 token balance on a few smart contracts), an account balance request must be made with each AccountIdentifier.
         */
        export interface AccountBalanceResponse {
            block_identifier: /* The block_identifier uniquely identifies a block in a particular network. */ BlockIdentifier;
            /**
             * A single account may have a balance in multiple currencies.
             */
            balances: /* Amount is some Value of a Currency. It is considered invalid to specify a Value without a Currency. */ Amount[];
            /**
             * Account-based blockchains that utilize a nonce or sequence number should include that number in the metadata. This number could be unique to the identifier or global across the account address.
             * example:
             * {
             *   "sequence_number": 23
             * }
             */
            metadata?: {};
        }
        /**
         * The account_identifier uniquely identifies an account within a network. All fields in the account_identifier are utilized to determine this uniqueness (including the metadata field, if populated).
         */
        export interface AccountIdentifier {
            /**
             * The address may be a cryptographic public key (or some encoding of it) or a provided username.
             * example:
             * 0x3a065000ab4183c6bf581dc1e55a605455fc6d61
             */
            address: string;
            sub_account?: /* An account may have state specific to a contract address (ERC-20 token) and/or a stake (delegated balance). The sub_account_identifier should specify which state (if applicable) an account instantiation refers to. */ SubAccountIdentifier;
            /**
             * Blockchains that utilize a username model (where the address is not a derivative of a cryptographic public key) should specify the public key(s) owned by the address in metadata.
             */
            metadata?: {};
        }
        /**
         * Allow specifies supported Operation status, Operation types, and all possible error statuses. This Allow object is used by clients to validate the correctness of a Rosetta Server implementation. It is expected that these clients will error if they receive some response that contains any of the above information that is not specified here.
         */
        export interface Allow {
            /**
             * All Operation.Status this implementation supports. Any status that is returned during parsing that is not listed here will cause client validation to error.
             */
            operation_statuses: /**
             * OperationStatus is utilized to indicate which Operation status are considered successful.
             * example:
             * {
             *   "status": "SUCCESS",
             *   "successful": true
             * }
             */
            OperationStatus[];
            /**
             * All Operation.Type this implementation supports. Any type that is returned during parsing that is not listed here will cause client validation to error.
             */
            operation_types: string[];
            /**
             * All Errors that this implementation could return. Any error that is returned during parsing that is not listed here will cause client validation to error.
             */
            errors: /* Instead of utilizing HTTP status codes to describe node errors (which often do not have a good analog), rich errors are returned using this object. */ Error[];
        }
        /**
         * Amount is some Value of a Currency. It is considered invalid to specify a Value without a Currency.
         */
        export interface Amount {
            /**
             * Value of the transaction in atomic units represented as an arbitrary-sized signed integer.  For example, 1 BTC would be represented by a value of 100000000.
             * example:
             * 1238089899992
             */
            value: string;
            currency: /* Currency is composed of a canonical Symbol and Decimals. This Decimals value is used to convert an Amount.Value from atomic units (Satoshis) to standard units (Bitcoins). */ Currency;
            metadata?: {};
        }
        /**
         * Blocks contain an array of Transactions that occurred at a particular BlockIdentifier.
         */
        export interface Block {
            block_identifier: /* The block_identifier uniquely identifies a block in a particular network. */ BlockIdentifier;
            parent_block_identifier: /* The block_identifier uniquely identifies a block in a particular network. */ BlockIdentifier;
            timestamp: /**
             * The timestamp of the block in milliseconds since the Unix Epoch. The timestamp is stored in milliseconds because some blockchains produce blocks more often than once a second.
             * example:
             * 1582833600000
             */
            Timestamp /* int64 */;
            transactions: /* Transactions contain an array of Operations that are attributable to the same TransactionIdentifier. */ Transaction[];
            /**
             * example:
             * {
             *   "transactions_root": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
             *   "difficulty": "123891724987128947"
             * }
             */
            metadata?: {};
        }
        /**
         * The block_identifier uniquely identifies a block in a particular network.
         */
        export interface BlockIdentifier {
            /**
             * This is also known as the block height.
             * example:
             * 1123941
             */
            index: number; // int64
            /**
             * example:
             * 0x1f2cc6c5027d2f201a5453ad1119574d2aed23a392654742ac3c78783c071f85
             */
            hash: string;
        }
        /**
         * A BlockRequest is utilized to make a block request on the /block endpoint.
         */
        export interface BlockRequest {
            network_identifier: /* The network_identifier specifies which network a particular object is associated with. */ NetworkIdentifier;
            block_identifier: /* When fetching data by BlockIdentifier, it may be possible to only specify the index or hash. If neither property is specified, it is assumed that the client is making a request at the current block. */ PartialBlockIdentifier;
        }
        /**
         * A BlockResponse includes a fully-populated block or a partially-populated block with a list of other transactions to fetch (other_transactions).
         */
        export interface BlockResponse {
            block: /* Blocks contain an array of Transactions that occurred at a particular BlockIdentifier. */ Block;
            /**
             * Some blockchains may require additional transactions to be fetched that weren't returned in the block response (ex: block only returns transaction hashes). For blockchains with a lot of transactions in each block, this can be very useful as consumers can concurrently fetch all transactions returned.
             */
            other_transactions?: /* The transaction_identifier uniquely identifies a transaction in a particular network and block or in the mempool. */ TransactionIdentifier[];
        }
        /**
         * A BlockTransactionRequest is used to fetch a Transaction included in a block that is not returned in a BlockResponse.
         */
        export interface BlockTransactionRequest {
            network_identifier: /* The network_identifier specifies which network a particular object is associated with. */ NetworkIdentifier;
            block_identifier: /* The block_identifier uniquely identifies a block in a particular network. */ BlockIdentifier;
            transaction_identifier: /* The transaction_identifier uniquely identifies a transaction in a particular network and block or in the mempool. */ TransactionIdentifier;
        }
        /**
         * A BlockTransactionResponse contains information about a block transaction.
         */
        export interface BlockTransactionResponse {
            transaction: /* Transactions contain an array of Operations that are attributable to the same TransactionIdentifier. */ Transaction;
        }
        /**
         * A ConstructionMetadataRequest is utilized to get information required to construct a transaction. The Options object used to specify which metadata to return is left purposely unstructured to allow flexibility for implementers.
         */
        export interface ConstructionMetadataRequest {
            network_identifier: /* The network_identifier specifies which network a particular object is associated with. */ NetworkIdentifier;
            /**
             * Some blockchains require different metadata for different types of transaction construction (ex: delegation versus a transfer). Instead of requiring a blockchain node to return all possible types of metadata for construction (which may require multiple node fetches), the client can populate an options object to limit the metadata returned to only the subset required.
             */
            options: {};
        }
        /**
         * The ConstructionMetadataResponse returns network-specific metadata used for transaction construction. It is likely that the client will not inspect this metadata before passing it to a client SDK that uses it for construction.
         */
        export interface ConstructionMetadataResponse {
            /**
             * example:
             * {
             *   "account_sequence": 23,
             *   "recent_block_hash": "0x52bc44d5378309ee2abf1539bf71de1b7d7be3b5"
             * }
             */
            metadata: {};
        }
        /**
         * The transaction submission request includes a signed transaction.
         */
        export interface ConstructionSubmitRequest {
            network_identifier: /* The network_identifier specifies which network a particular object is associated with. */ NetworkIdentifier;
            signed_transaction: string;
        }
        /**
         * A TransactionSubmitResponse contains the transaction_identifier of a submitted transaction that was accepted into the mempool.
         */
        export interface ConstructionSubmitResponse {
            transaction_identifier: /* The transaction_identifier uniquely identifies a transaction in a particular network and block or in the mempool. */ TransactionIdentifier;
            metadata?: {};
        }
        /**
         * Currency is composed of a canonical Symbol and Decimals. This Decimals value is used to convert an Amount.Value from atomic units (Satoshis) to standard units (Bitcoins).
         */
        export interface Currency {
            /**
             * Canonical symbol associated with a currency.
             * example:
             * BTC
             */
            symbol: string;
            /**
             * Number of decimal places in the standard unit representation of the amount.  For example, BTC has 8 decimals. Note that it is not possible to represent the value of some currency in atomic units that is not base 10.
             * example:
             * 8
             */
            decimals: number; // int32
            /**
             * Any additional information related to the currency itself.  For example, it would be useful to populate this object with the contract address of an ERC-20 token.
             * example:
             * {
             *   "Issuer": "Satoshi"
             * }
             */
            metadata?: {};
        }
        /**
         * Instead of utilizing HTTP status codes to describe node errors (which often do not have a good analog), rich errors are returned using this object.
         */
        export interface Error {
            /**
             * Code is a network-specific error code. If desired, this code can be equivalent to an HTTP status code.
             */
            code: number; // int32
            /**
             * Message is a network-specific error message.
             */
            message: string;
            /**
             * An error is retriable if the same request may succeed if submitted again.
             */
            retriable: boolean;
        }
        /**
         * A MempoolRequest is utilized to retrieve all transaction identifiers in the mempool for a particular network_identifier.
         */
        export interface MempoolRequest {
            network_identifier: /* The network_identifier specifies which network a particular object is associated with. */ NetworkIdentifier;
        }
        /**
         * A MempoolResponse contains all transaction identifiers in the mempool for a particular network_identifier.
         */
        export interface MempoolResponse {
            transaction_identifiers: /* The transaction_identifier uniquely identifies a transaction in a particular network and block or in the mempool. */ TransactionIdentifier[];
        }
        /**
         * A MempoolTransactionRequest is utilized to retrieve a transaction from the mempool.
         */
        export interface MempoolTransactionRequest {
            network_identifier: /* The network_identifier specifies which network a particular object is associated with. */ NetworkIdentifier;
            transaction_identifier: /* The transaction_identifier uniquely identifies a transaction in a particular network and block or in the mempool. */ TransactionIdentifier;
        }
        /**
         * A MempoolTransactionResponse contains an estimate of a mempool transaction. It may not be possible to know the full impact of a transaction in the mempool (ex: fee paid).
         */
        export interface MempoolTransactionResponse {
            transaction: /* Transactions contain an array of Operations that are attributable to the same TransactionIdentifier. */ Transaction;
            /**
             * example:
             * {
             *   "descendant_fees": 123923,
             *   "ancestor_count": 2
             * }
             */
            metadata?: {};
        }
        /**
         * A MetadataRequest is utilized in any request where the only argument is optional metadata.
         */
        export interface MetadataRequest {
            metadata?: {};
        }
        /**
         * The network_identifier specifies which network a particular object is associated with.
         */
        export interface NetworkIdentifier {
            /**
             * example:
             * bitcoin
             */
            blockchain: string;
            /**
             * If a blockchain has a specific chain-id or network identifier, it should go in this field. It is up to the client to determine which network-specific identifier is mainnet or testnet.
             * example:
             * mainnet
             */
            network: string;
            sub_network_identifier?: /* In blockchains with sharded state, the SubNetworkIdentifier is required to query some object on a specific shard. This identifier is optional for all non-sharded blockchains. */ SubNetworkIdentifier;
        }
        /**
         * A NetworkListResponse contains all NetworkIdentifiers that the node can serve information for.
         */
        export interface NetworkListResponse {
            network_identifiers: /* The network_identifier specifies which network a particular object is associated with. */ NetworkIdentifier[];
        }
        /**
         * NetworkOptionsResponse contains information about the versioning of the node and the allowed operation statuses, operation types, and errors.
         */
        export interface NetworkOptionsResponse {
            version: /* The Version object is utilized to inform the client of the versions of different components of the Rosetta implementation. */ Version;
            allow: /* Allow specifies supported Operation status, Operation types, and all possible error statuses. This Allow object is used by clients to validate the correctness of a Rosetta Server implementation. It is expected that these clients will error if they receive some response that contains any of the above information that is not specified here. */ Allow;
        }
        /**
         * A NetworkRequest is utilized to retrieve some data specific exclusively to a NetworkIdentifier.
         */
        export interface NetworkRequest {
            network_identifier: /* The network_identifier specifies which network a particular object is associated with. */ NetworkIdentifier;
            metadata?: {};
        }
        /**
         * NetworkStatusResponse contains basic information about the node's view of a blockchain network.
         */
        export interface NetworkStatusResponse {
            current_block_identifier: /* The block_identifier uniquely identifies a block in a particular network. */ BlockIdentifier;
            current_block_timestamp: /**
             * The timestamp of the block in milliseconds since the Unix Epoch. The timestamp is stored in milliseconds because some blockchains produce blocks more often than once a second.
             * example:
             * 1582833600000
             */
            Timestamp /* int64 */;
            genesis_block_identifier: /* The block_identifier uniquely identifies a block in a particular network. */ BlockIdentifier;
            peers: /* A Peer is a representation of a node's peer. */ Peer[];
        }
        /**
         * Operations contain all balance-changing information within a transaction. They are always one-sided (only affect 1 AccountIdentifier) and can succeed or fail independently from a Transaction.
         */
        export interface Operation {
            operation_identifier: /* The operation_identifier uniquely identifies an operation within a transaction. */ OperationIdentifier;
            /**
             * Restrict referenced related_operations to identifier indexes < the current operation_identifier.index. This ensures there exists a clear DAG-structure of relations.  Since operations are one-sided, one could imagine relating operations in a single transfer or linking operations in a call tree.
             * example:
             * [
             *   {
             *     "index": 0,
             *     "operation_identifier": {
             *       "index": 0
             *     }
             *   }
             * ]
             */
            related_operations?: /* The operation_identifier uniquely identifies an operation within a transaction. */ OperationIdentifier[];
            /**
             * The network-specific type of the operation. Ensure that any type that can be returned here is also specified in the NetowrkStatus. This can be very useful to downstream consumers that parse all block data.
             * example:
             * Transfer
             */
            type: string;
            /**
             * The network-specific status of the operation. Status is not defined on the transaction object because blockchains with smart contracts may have transactions that partially apply.  Blockchains with atomic transactions (all operations succeed or all operations fail) will have the same status for each operation.
             * example:
             * Reverted
             */
            status: string;
            account?: /* The account_identifier uniquely identifies an account within a network. All fields in the account_identifier are utilized to determine this uniqueness (including the metadata field, if populated). */ AccountIdentifier;
            amount?: /* Amount is some Value of a Currency. It is considered invalid to specify a Value without a Currency. */ Amount;
            /**
             * example:
             * {
             *   "asm": "304502201fd8abb11443f8b1b9a04e0495e0543d05611473a790c8939f089d073f90509a022100f4677825136605d732e2126d09a2d38c20c75946cd9fc239c0497e84c634e3dd01 03301a8259a12e35694cc22ebc45fee635f4993064190f6ce96e7fb19a03bb6be2",
             *   "hex": "48304502201fd8abb11443f8b1b9a04e0495e0543d05611473a790c8939f089d073f90509a022100f4677825136605d732e2126d09a2d38c20c75946cd9fc239c0497e84c634e3dd012103301a8259a12e35694cc22ebc45fee635f4993064190f6ce96e7fb19a03bb6be2"
             * }
             */
            metadata?: {};
        }
        /**
         * The operation_identifier uniquely identifies an operation within a transaction.
         */
        export interface OperationIdentifier {
            /**
             * The operation index is used to ensure each operation has a unique identifier within a transaction.  To clarify, there may not be any notion of an operation index in the blockchain being described.
             * example:
             * 1
             */
            index: number; // int64
            /**
             * Some blockchains specify an operation index that is essential for client use. For example, Bitcoin uses a network_index to identify which UTXO was used in a transaction.  network_index should not be populated if there is no notion of an operation index in a blockchain (typically most account-based blockchains).
             * example:
             * 0
             */
            network_index?: number; // int64
        }
        /**
         * OperationStatus is utilized to indicate which Operation status are considered successful.
         * example:
         * {
         *   "status": "SUCCESS",
         *   "successful": true
         * }
         */
        export interface OperationStatus {
            /**
             * The status is the network-specific status of the operation.
             */
            status: string;
            /**
             * An Operation is considered successful if the Operation.Amount should affect the Operation.Account. Some blockchains (like Bitcoin) only include successful operations in blocks but other blockchains (like Ethereum) include unsuccessful operations that incur a fee.  To reconcile the computed balance from the stream of Operations, it is critical to understand which Operation.Status indicate an Operation is successful and should affect an Account.
             */
            successful: boolean;
        }
        /**
         * When fetching data by BlockIdentifier, it may be possible to only specify the index or hash. If neither property is specified, it is assumed that the client is making a request at the current block.
         */
        export interface PartialBlockIdentifier {
            /**
             * example:
             * 1123941
             */
            index?: number; // int64
            /**
             * example:
             * 0x1f2cc6c5027d2f201a5453ad1119574d2aed23a392654742ac3c78783c071f85
             */
            hash?: string;
        }
        /**
         * A Peer is a representation of a node's peer.
         */
        export interface Peer {
            /**
             * example:
             * 0x52bc44d5378309ee2abf1539bf71de1b7d7be3b5
             */
            peer_id: string;
            metadata?: {};
        }
        /**
         * An account may have state specific to a contract address (ERC-20 token) and/or a stake (delegated balance). The sub_account_identifier should specify which state (if applicable) an account instantiation refers to.
         */
        export interface SubAccountIdentifier {
            /**
             * The SubAccount address may be a cryptographic value or some other identifier (ex: bonded) that uniquely specifies a SubAccount.
             * example:
             * 0x6b175474e89094c44da98b954eedeac495271d0f
             */
            address: string;
            /**
             * If the SubAccount address is not sufficient to uniquely specify a SubAccount, any other identifying information can be stored here.  It is important to note that two SubAccounts with identical addresses but differing metadata will not be considered equal by clients.
             */
            metadata?: {};
        }
        /**
         * In blockchains with sharded state, the SubNetworkIdentifier is required to query some object on a specific shard. This identifier is optional for all non-sharded blockchains.
         */
        export interface SubNetworkIdentifier {
            /**
             * example:
             * shard 1
             */
            network: string;
            /**
             * example:
             * {
             *   "producer": "0x52bc44d5378309ee2abf1539bf71de1b7d7be3b5"
             * }
             */
            metadata?: {};
        }
        /**
         * The timestamp of the block in milliseconds since the Unix Epoch. The timestamp is stored in milliseconds because some blockchains produce blocks more often than once a second.
         * example:
         * 1582833600000
         */
        export type Timestamp = number; // int64
        /**
         * Transactions contain an array of Operations that are attributable to the same TransactionIdentifier.
         */
        export interface Transaction {
            transaction_identifier: /* The transaction_identifier uniquely identifies a transaction in a particular network and block or in the mempool. */ TransactionIdentifier;
            operations: /* Operations contain all balance-changing information within a transaction. They are always one-sided (only affect 1 AccountIdentifier) and can succeed or fail independently from a Transaction. */ Operation[];
            /**
             * Transactions that are related to other transactions (like a cross-shard transactioin) should include the tranaction_identifier of these transactions in the metadata.
             * example:
             * {
             *   "size": 12378,
             *   "lockTime": 1582272577
             * }
             */
            metadata?: {};
        }
        /**
         * The transaction_identifier uniquely identifies a transaction in a particular network and block or in the mempool.
         */
        export interface TransactionIdentifier {
            /**
             * Any transactions that are attributable only to a block (ex: a block event) should use the hash of the block as the identifier.
             * example:
             * 0x2f23fd8cca835af21f3ac375bac601f97ead75f2e79143bdf71fe2c4be043e8f
             */
            hash: string;
        }
        /**
         * The Version object is utilized to inform the client of the versions of different components of the Rosetta implementation.
         */
        export interface Version {
            /**
             * The rosetta_version is the version of the Rosetta interface the implementation adheres to. This can be useful for clients looking to reliably parse responses.
             * example:
             * 1.2.5
             */
            rosetta_version: string;
            /**
             * The node_version is the canonical version of the node runtime. This can help clients manage deployments.
             * example:
             * 1.0.2
             */
            node_version: string;
            /**
             * When a middleware server is used to adhere to the Rosetta interface, it should return its version here. This can help clients manage deployments.
             * example:
             * 0.2.7
             */
            middleware_version?: string;
            /**
             * Any other information that may be useful about versioning of dependent services should be returned here.
             */
            metadata?: {};
        }
    }
}
declare namespace Paths {
    namespace AccountBalance {
        export type RequestBody = /* An AccountBalanceRequest is utilized to make a balance request on the /account/balance endpoint. If the block_identifier is populated, a historical balance query should be performed. */ Components.Schemas.AccountBalanceRequest;
        namespace Responses {
            export type $200 = /* An AccountBalanceResponse is returned on the /account/balance endpoint. If an account has a balance for each AccountIdentifier describing it (ex: an ERC-20 token balance on a few smart contracts), an account balance request must be made with each AccountIdentifier. */ Components.Schemas.AccountBalanceResponse;
            export type Default = /* Instead of utilizing HTTP status codes to describe node errors (which often do not have a good analog), rich errors are returned using this object. */ Components.Schemas.Error;
        }
    }
    namespace Block {
        export type RequestBody = /* A BlockRequest is utilized to make a block request on the /block endpoint. */ Components.Schemas.BlockRequest;
        namespace Responses {
            export type $200 = /* A BlockResponse includes a fully-populated block or a partially-populated block with a list of other transactions to fetch (other_transactions). */ Components.Schemas.BlockResponse;
            export type Default = /* Instead of utilizing HTTP status codes to describe node errors (which often do not have a good analog), rich errors are returned using this object. */ Components.Schemas.Error;
        }
    }
    namespace BlockTransaction {
        export type RequestBody = /* A BlockTransactionRequest is used to fetch a Transaction included in a block that is not returned in a BlockResponse. */ Components.Schemas.BlockTransactionRequest;
        namespace Responses {
            export type $200 = /* A BlockTransactionResponse contains information about a block transaction. */ Components.Schemas.BlockTransactionResponse;
            export type Default = /* Instead of utilizing HTTP status codes to describe node errors (which often do not have a good analog), rich errors are returned using this object. */ Components.Schemas.Error;
        }
    }
    namespace ConstructionMetadata {
        export type RequestBody = /* A ConstructionMetadataRequest is utilized to get information required to construct a transaction. The Options object used to specify which metadata to return is left purposely unstructured to allow flexibility for implementers. */ Components.Schemas.ConstructionMetadataRequest;
        namespace Responses {
            export type $200 = /* The ConstructionMetadataResponse returns network-specific metadata used for transaction construction. It is likely that the client will not inspect this metadata before passing it to a client SDK that uses it for construction. */ Components.Schemas.ConstructionMetadataResponse;
            export type Default = /* Instead of utilizing HTTP status codes to describe node errors (which often do not have a good analog), rich errors are returned using this object. */ Components.Schemas.Error;
        }
    }
    namespace ConstructionSubmit {
        export type RequestBody = /* The transaction submission request includes a signed transaction. */ Components.Schemas.ConstructionSubmitRequest;
        namespace Responses {
            export type $200 = /* A TransactionSubmitResponse contains the transaction_identifier of a submitted transaction that was accepted into the mempool. */ Components.Schemas.ConstructionSubmitResponse;
            export type Default = /* Instead of utilizing HTTP status codes to describe node errors (which often do not have a good analog), rich errors are returned using this object. */ Components.Schemas.Error;
        }
    }
    namespace Mempool {
        export type RequestBody = /* A MempoolRequest is utilized to retrieve all transaction identifiers in the mempool for a particular network_identifier. */ Components.Schemas.MempoolRequest;
        namespace Responses {
            export type $200 = /* A MempoolResponse contains all transaction identifiers in the mempool for a particular network_identifier. */ Components.Schemas.MempoolResponse;
            export type Default = /* Instead of utilizing HTTP status codes to describe node errors (which often do not have a good analog), rich errors are returned using this object. */ Components.Schemas.Error;
        }
    }
    namespace MempoolTransaction {
        export type RequestBody = /* A MempoolTransactionRequest is utilized to retrieve a transaction from the mempool. */ Components.Schemas.MempoolTransactionRequest;
        namespace Responses {
            export type $200 = /* A MempoolTransactionResponse contains an estimate of a mempool transaction. It may not be possible to know the full impact of a transaction in the mempool (ex: fee paid). */ Components.Schemas.MempoolTransactionResponse;
            export type Default = /* Instead of utilizing HTTP status codes to describe node errors (which often do not have a good analog), rich errors are returned using this object. */ Components.Schemas.Error;
        }
    }
    namespace NetworkList {
        export type RequestBody = /* A MetadataRequest is utilized in any request where the only argument is optional metadata. */ Components.Schemas.MetadataRequest;
        namespace Responses {
            export type $200 = /* A NetworkListResponse contains all NetworkIdentifiers that the node can serve information for. */ Components.Schemas.NetworkListResponse;
            export type Default = /* Instead of utilizing HTTP status codes to describe node errors (which often do not have a good analog), rich errors are returned using this object. */ Components.Schemas.Error;
        }
    }
    namespace NetworkOptions {
        export type RequestBody = /* A NetworkRequest is utilized to retrieve some data specific exclusively to a NetworkIdentifier. */ Components.Schemas.NetworkRequest;
        namespace Responses {
            export type $200 = /* NetworkOptionsResponse contains information about the versioning of the node and the allowed operation statuses, operation types, and errors. */ Components.Schemas.NetworkOptionsResponse;
            export type Default = /* Instead of utilizing HTTP status codes to describe node errors (which often do not have a good analog), rich errors are returned using this object. */ Components.Schemas.Error;
        }
    }
    namespace NetworkStatus {
        export type RequestBody = /* A NetworkRequest is utilized to retrieve some data specific exclusively to a NetworkIdentifier. */ Components.Schemas.NetworkRequest;
        namespace Responses {
            export type $200 = /* NetworkStatusResponse contains basic information about the node's view of a blockchain network. */ Components.Schemas.NetworkStatusResponse;
            export type Default = /* Instead of utilizing HTTP status codes to describe node errors (which often do not have a good analog), rich errors are returned using this object. */ Components.Schemas.Error;
        }
    }
}
