import { Context } from '../../src/context';
import { ContractAbstraction, MANAGER_LAMBDA } from '../../src/contract';
import { ContractMethod } from '../../src/contract/contract-methods/contract-method-flat-param';
import { ContractMethodObject } from '../../src/contract/contract-methods/contract-method-object-param';
import { RpcContractProvider } from '../../src/contract/rpc-contract-provider';
import { noAnnotCode } from '../../../../integration-tests/data/token_without_annotation';
import { genericMultisig } from '../../../../integration-tests/data/multisig';
import { entrypointsGenericMultisig } from './data';

describe('ContractAbstraction test', () => {
  let rpcContractProvider: RpcContractProvider;
  let mockRpcClient: {};
  let mockSigner: {};
  let mockEstimate: {};

  beforeEach(() => {
    mockRpcClient = {};
    mockSigner = {};
    mockEstimate = {};
    rpcContractProvider = new RpcContractProvider(
      // deepcode ignore no-any: any is good enough
      new Context(mockRpcClient as any, mockSigner as any),
      mockEstimate as any
    );
  });

  describe('Calling the `toTansferParams` method on a `ContractMethod` and a `ContractMethodObject` should return the same value', () => {
    it('calls the main method of a contract having annotations (genericMultisig where action is change_keys)', async (done) => {

      const contratcAbs = new ContractAbstraction(
        'contractAddress',
        {
          code: genericMultisig,
          storage: {}
        },
        rpcContractProvider,
        rpcContractProvider,
        entrypointsGenericMultisig,
        'chain_test'
      );

      // Calling the smart contract main method using flat arguments
      const methodMainChangeKeys = contratcAbs.methods.main(
        2,
        'change_keys',
        2,
        ['edpkvS5QFv7KRGfa3b87gg9DBpxSm3NpSwnjhUjNBQrRUUR66F7C9g'],
        ['sigb1FKPeiRgPApxqBMpyBSMpwgnbzhaMcqQcTVwMz82MSzNLBrmRUuVZVgWTBFGcoWQcjTyhfJaxjFtfvB6GGHkfwpxBkFd']
      );

      expect(methodMainChangeKeys).toBeInstanceOf(ContractMethod);
      expect(methodMainChangeKeys.getSignature()).toEqual([["nat", "operation", {"lambda": {"parameters": "unit", "returns": {"list": "operation"}}}, {"list": "signature"}], ["nat", "change_keys", "nat", {"list": "key"}, {"list": "signature"}]])

      // Calling the smart contract main method using an object as a parameter where the keys are the annotations
      const methodObjectMainChangeKeys = contratcAbs.methodsObject.main({
        payload: {
          counter: 2,
          action: {
            // the chosen action is change_keys (rather than operation)
            change_keys: {
              threshold: 2,
              keys: ['edpkvS5QFv7KRGfa3b87gg9DBpxSm3NpSwnjhUjNBQrRUUR66F7C9g']
            }
          }
        },
        sigs: [
          'sigb1FKPeiRgPApxqBMpyBSMpwgnbzhaMcqQcTVwMz82MSzNLBrmRUuVZVgWTBFGcoWQcjTyhfJaxjFtfvB6GGHkfwpxBkFd'
        ]
      });

      expect(methodObjectMainChangeKeys).toBeInstanceOf(ContractMethodObject);
      expect(methodObjectMainChangeKeys.getSignature()).toEqual({
        payload: {
          counter: 'nat',
          action: {
            change_keys: {
              threshold: 'nat',
              keys: { list: 'key' }
            },
            operation: {
              'lambda': {
                "parameters": "unit",
                "returns": {
                  "list": "operation",
                },
             }
            }
          }
        },
        sigs: { list: 'signature' }
      })
      expect(methodObjectMainChangeKeys.toTransferParams()).toEqual(methodMainChangeKeys.toTransferParams());
      expect(methodObjectMainChangeKeys.toTransferParams()).toEqual({
        "to": "contractAddress",
        "amount": 0,
        "mutez": false,
        "parameter": {
          "entrypoint": "main",
          "value": {
            "prim": "Pair",
            "args": [
              {
                "prim": "Pair",
                "args": [
                  {
                    "int": "2"
                  },
                  {
                    "prim": "Right",
                    "args": [
                      {
                        "prim": "Pair",
                        "args": [
                          {
                            "int": "2"
                          },
                          [
                            {
                              "string": "edpkvS5QFv7KRGfa3b87gg9DBpxSm3NpSwnjhUjNBQrRUUR66F7C9g"
                            }
                          ]
                        ]
                      }
                    ]
                  }
                ]
              },
              [
                {
                  "prim": "Some",
                  "args": [
                    {
                      "string": "sigb1FKPeiRgPApxqBMpyBSMpwgnbzhaMcqQcTVwMz82MSzNLBrmRUuVZVgWTBFGcoWQcjTyhfJaxjFtfvB6GGHkfwpxBkFd"
                    }
                  ]
                }
              ]
            ]
          }
        }
      });
      done();
    });

    it('calls the main method of a contract having annotations (genericMultisig where action is operation)', async (done) => {

      const contratcAbs = new ContractAbstraction(
        'contractAddress',
        {
          code: genericMultisig,
          storage: {}
        },
        rpcContractProvider,
        rpcContractProvider,
        entrypointsGenericMultisig,
        'chain_test'
      );

      // Calling the smart contract main method using flat arguments
      const methodMainoperation = contratcAbs.methods.main(
        '2', // Counter
        'operation', // Sub function
        MANAGER_LAMBDA.transferImplicit('tz1eY5Aqa1kXDFoiebL28emyXFoneAoVg1zh', 500), // Action
        ['sigb1FKPeiRgPApxqBMpyBSMpwgnbzhaMcqQcTVwMz82MSzNLBrmRUuVZVgWTBFGcoWQcjTyhfJaxjFtfvB6GGHkfwpxBkFd'] // Signature list
      );

      expect(methodMainoperation).toBeInstanceOf(ContractMethod);

      // Calling the smart contract main method using an object as a parameter where the keys are the annotations
      const methodObjectMainoperation = contratcAbs.methodsObject.main({
        payload: {
          counter: 2,
          action: {
            // the chosen action is operation (rather than change_keys)
            operation: MANAGER_LAMBDA.transferImplicit('tz1eY5Aqa1kXDFoiebL28emyXFoneAoVg1zh', 500)
          }
        },
        sigs: [
          'sigb1FKPeiRgPApxqBMpyBSMpwgnbzhaMcqQcTVwMz82MSzNLBrmRUuVZVgWTBFGcoWQcjTyhfJaxjFtfvB6GGHkfwpxBkFd'
        ]
      });

      expect(methodObjectMainoperation).toBeInstanceOf(ContractMethodObject);

      expect(methodObjectMainoperation.toTransferParams()).toEqual(methodMainoperation.toTransferParams());
      expect(methodObjectMainoperation.toTransferParams()).toEqual({
        "to": "contractAddress",
        "amount": 0,
        "mutez": false,
        "parameter": {
          "entrypoint": "main",
          "value": {
            "prim": "Pair",
            "args": [
              {
                "prim": "Pair",
                "args": [
                  {
                    "int": "2"
                  },
                  {
                    "prim": "Left",
                    "args": [
                      [
                        {
                          "prim": "DROP"
                        },
                        {
                          "prim": "NIL",
                          "args": [
                            {
                              "prim": "operation"
                            }
                          ]
                        },
                        {
                          "prim": "PUSH",
                          "args": [
                            {
                              "prim": "key_hash"
                            },
                            {
                              "string": "tz1eY5Aqa1kXDFoiebL28emyXFoneAoVg1zh"
                            }
                          ]
                        },
                        {
                          "prim": "IMPLICIT_ACCOUNT"
                        },
                        {
                          "prim": "PUSH",
                          "args": [
                            {
                              "prim": "mutez"
                            },
                            {
                              "int": "500"
                            }
                          ]
                        },
                        {
                          "prim": "UNIT"
                        },
                        {
                          "prim": "TRANSFER_TOKENS"
                        },
                        {
                          "prim": "CONS"
                        }
                      ]
                    ]
                  }
                ]
              },
              [
                {
                  "prim": "Some",
                  "args": [
                    {
                      "string": "sigb1FKPeiRgPApxqBMpyBSMpwgnbzhaMcqQcTVwMz82MSzNLBrmRUuVZVgWTBFGcoWQcjTyhfJaxjFtfvB6GGHkfwpxBkFd"
                    }
                  ]
                }
              ]
            ]
          }
        }
      });
      done();
    });

    it('calls the first entry point (0) of a contract having no annotation', async (done) => {

      const contratcAbs = new ContractAbstraction(
        'contractAddress',
        {
          code: noAnnotCode,
          storage: []
        },
        rpcContractProvider,
        rpcContractProvider,
        { entrypoints: {} },
        'chain_test'
      );

      const method0 = contratcAbs.methods[0]('tz1ZfrERcALBwmAqwonRXYVQBDT9BjNjBHJu', 'tz1ZfrERcALBwmAqwonRXYVQBDT9BjNjBHJu', '1');
      expect(method0).toBeInstanceOf(ContractMethod);
      expect(method0.getSignature()).toEqual(["address", "address", "nat"])

      const methodObject0 = contratcAbs.methodsObject[0]({
        0: 'tz1ZfrERcALBwmAqwonRXYVQBDT9BjNjBHJu',
        1: 'tz1ZfrERcALBwmAqwonRXYVQBDT9BjNjBHJu',
        2: '1'
      });
      expect(methodObject0).toBeInstanceOf(ContractMethodObject);
      expect(methodObject0.getSignature()).toEqual({0:"address", 1:"address", 2:"nat"})

      expect(methodObject0.toTransferParams()).toEqual(method0.toTransferParams());
      expect(methodObject0.toTransferParams()).toEqual({
        "to": "contractAddress",
        "amount": 0,
        "mutez": false,
        "parameter": {
          "entrypoint": "default",
          "value": {
            "prim": "Left",
            "args": [
              {
                "prim": "Left",
                "args": [
                  {
                    "prim": "Left",
                    "args": [
                      {
                        "prim": "Pair",
                        "args": [
                          {
                            "string": "tz1ZfrERcALBwmAqwonRXYVQBDT9BjNjBHJu"
                          },
                          {
                            "prim": "Pair",
                            "args": [
                              {
                                "string": "tz1ZfrERcALBwmAqwonRXYVQBDT9BjNjBHJu"
                              },
                              {
                                "int": "1"
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        }
      })
      done();
    });

    it('calls the third entry point (2) of a contract having no annotation', async (done) => {

      const contratcAbs = new ContractAbstraction(
        'contractAddress',
        {
          code: noAnnotCode,
          storage: []
        },
        rpcContractProvider,
        rpcContractProvider,
        { entrypoints: {} },
        'chain_test'
      );

      const method2 = contratcAbs.methods[2]('tz1ZfrERcALBwmAqwonRXYVQBDT9BjNjBHJu', '1');
      expect(method2).toBeInstanceOf(ContractMethod);

      const methodObject2 = contratcAbs.methodsObject[2]({
        2: 'tz1ZfrERcALBwmAqwonRXYVQBDT9BjNjBHJu',
        3: '1'
      });
      expect(methodObject2).toBeInstanceOf(ContractMethodObject);

      expect(methodObject2.toTransferParams()).toEqual(method2.toTransferParams());
      expect(methodObject2.toTransferParams()).toEqual({
        "to": "contractAddress",
        "amount": 0,
        "mutez": false,
        "parameter": {
          "entrypoint": "default",
          "value": {
            "prim": "Left",
            "args": [
              {
                "prim": "Left",
                "args": [
                  {
                    "prim": "Right",
                    "args": [
                      {
                        "prim": "Right",
                        "args": [
                          {
                            "prim": "Pair",
                            "args": [
                              {
                                "string": "tz1ZfrERcALBwmAqwonRXYVQBDT9BjNjBHJu"
                              },
                              {
                                "int": "1"
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        }
      });
      done();
    });
  });
});
