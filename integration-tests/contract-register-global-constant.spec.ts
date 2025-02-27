import { Protocols } from '@taquito/taquito';
import { CONFIGS } from './config';
import BigNumber from 'bignumber.js';
const crypto = require('crypto');

CONFIGS().forEach(({ lib, rpc, setup, protocol }) => {
  const Tezos = lib;
  const hangzhounet = protocol === Protocols.PtHangzH ? test : test.skip;

  describe(`Register global constants using: ${rpc}`, () => {
    const randomAnnots = () => crypto.randomBytes(3).toString('hex');
    let annots = randomAnnots();

    beforeEach(async (done) => {
      await setup(true);
      done();
    });
    
    hangzhounet('Register a Micheline expression to the global table of constants', async (done) => {
      // We use a randomized annots in the Micheline expression because an expression can only be registered once.
      const op = await Tezos.contract.registerGlobalConstant({
        value: {
          prim: 'list',
          args: [{ prim: 'nat' }],
          annots: [`%${annots}`]
        },
        fee: 500,
        storageLimit: 90,
        gasLimit: 1400
      });
      await op.confirmation();
      expect(op.hash).toBeDefined();
      expect(op.fee).toEqual(500);
      expect(op.storageLimit).toEqual(90);
      expect(op.gasLimit).toEqual(1400);
      expect(op.includedInBlock).toBeLessThan(Number.POSITIVE_INFINITY);
      expect(op.status).toEqual('applied');

      done();
    });

    hangzhounet(
      'Register a Micheline expression to the global table of constants with auto-estimation of the fee, storage limit and gas limit',
      async (done) => {
        const op = await Tezos.contract.registerGlobalConstant({
          value: {
            prim: 'list',
            args: [{ prim: 'nat' }],
            annots: [`%${randomAnnots()}`]
          }
        });
        await op.confirmation();
        expect(op.hash).toBeDefined();
        expect(op.includedInBlock).toBeLessThan(Number.POSITIVE_INFINITY);
        expect(op.status).toEqual('applied');

        done();
      }
    );

    hangzhounet('registers a global constant and deploy a contract with the constant', async (done) => {
      const constantAddress = 'expruu5BTdW7ajqJ9XPTF3kgcV78pRiaBW3Gq31mgp3WSYjjUBYxre';

      try {
        const op = await Tezos.contract.registerGlobalConstant({
          value: { "prim":"int" }
        });
        await op.confirmation();
        expect(op.globalAddress).toEqual(constantAddress);
      } catch (ex: any) {
        // We can not register the same constant multiple time
        expect(ex.message).toMatch(/context.storage_error/);
      }

      const op = await Tezos.contract.originate({
        code: [
          {
            prim: 'parameter',
            args: [
              {
                prim: 'or',
                args: [
                  {
                    prim: 'or',
                    args: [
                      { prim: 'int', annots: ['%decrement'] },
                      { prim: 'int', annots: ['%increment'] }
                    ]
                  },
                  { prim: 'unit', annots: ['%reset'] }
                ]
              }
            ]
          },
          { prim: 'storage', args: [{ prim: 'constant', args: [{ string: `${constantAddress}` }] }] },
          {
            prim: 'code',
            args: [
              [
                { prim: 'UNPAIR' },
                {
                  prim: 'constant',
                  args: [{ string: 'expruLxwnPPDw8ZNu9oX51oWGUkRnuGrvqxrvN5W4eYZxRBQShmbLe' }]
                },
                { prim: 'NIL', args: [{ prim: 'operation' }] },
                { prim: 'PAIR' }
              ]
            ]
          }
        ],
        // TODO: Replace `init` property with `storage` when `constant` will be supported in the `Michelson-Encoder` package
        init: { int: '4' }
      });
      await op.confirmation();
      expect(op.hash).toBeDefined();
      expect(op.includedInBlock).toBeLessThan(Number.POSITIVE_INFINITY);
      const contract = await op.contract();

      const storage: any = await contract.storage();
      expect(storage).toEqual(new BigNumber(4));

      done();
    });
  });
});
