# capacitor-onebot-connctor

这是一个提供简易的后端 Onebot Websocket 交互的 Capacitor 插件。

## Install

```bash
npm install capacitor-onebot-connctor
npx cap sync
```

## API

<docgen-index>

* [`connect(...)`](#connect)
* [`send(...)`](#send)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### connect(...)

```typescript
connect(options: { url: string; }) => Promise<{ success: boolean; }>
```

| Param         | Type                          |
| ------------- | ----------------------------- |
| **`options`** | <code>{ url: string; }</code> |

**Returns:** <code>Promise&lt;{ success: boolean; }&gt;</code>

--------------------


### send(...)

```typescript
send(options: { data: string; }) => Promise<{ success: boolean; }>
```

| Param         | Type                           |
| ------------- | ------------------------------ |
| **`options`** | <code>{ data: string; }</code> |

**Returns:** <code>Promise&lt;{ success: boolean; }&gt;</code>

--------------------

</docgen-api>
