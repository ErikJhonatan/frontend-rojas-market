# Regression cases

Prepared for this change. **Not executed.** Tests, manual checks, lint and builds require explicit user authorization. Use isolated fixtures; never run destructive cases against production.

| Case | Input or setup | Expected outcome |
| --- | --- | --- |
| Stored cart | cartItems contains broken JSON, object instead of array, negative quantity or invalid price | App renders with safe cart; invalid items excluded |
| Stock | Increment stock=2 product from quantity=2 to 3 | Reducer keeps quantity=2 |
| Totals | 0.1 x 3 plus 0.2 x 1 | Total=0.50 |
| Duplicate order | Two synchronous clicks while mock promise pending | One simulated checkout |
| Simulation contract | Create mock order then add item using its order_ timestamp ID | Both responses contain simulated:true; UI explicitly labels simulation |
| Auth storage | user storage contains malformed JSON; login API returns message object on failure | No render crash; failure is an Error; no fake authentication |

Automated cases are prepared in `tests/regression.test.mjs`. After authorization, run `node --test tests/regression.test.mjs`. They have not been executed.

Additional prepared cases: login does not log credentials or tokens; development `/api/v1/auth/login` is forwarded to `API_PROXY_TARGET`; existing API failure assertions require promise rejection with the server or network message. Not executed.

## Additional cases (not executed)

| Case | Input or setup | Expected outcome |
| --- | --- | --- |
| Invalid persisted cart | Duplicate product IDs, null/blank prices, unsafe cent total | Duplicate entries discarded; invalid prices and overflow rejected |
