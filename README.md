## 一、后端接口

#### 1. 返回当前交易总数和区块高度

**参数**

- `groupID`: `unsigned int` - 群组ID**(固定为1)**

```json
Request
{"jsonrpc":"2.0","method":"getTotalTransactionCount","params":[1],"id":1}
```

**返回值**

- `object`: - 当前交易总数和区块高度信息，其字段如下：
  - `blockNumber`: `string` - 区块高度
  - `failedTxSum`: `string` - 失败的交易总数
  - `txSum`: `string` - 交易总数

```json
result
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": {
      "blockNumber": "0x1",    //区块总数
      "failedTxSum": "0x0",    //失败交易总数
      "txSum": "0x1"      //交易总数
    }
}
```

![image-20230109111313709](C:\Users\DELL\AppData\Roaming\Typora\typora-user-images\image-20230109111313709.png)



#### 2. 返回待打包的交易数量

**参数**

- `groupID`: `unsigned int` - 群组ID**(固定为1)**

```json
request
{"jsonrpc":"2.0","method":"getPendingTxSize","params":[1],"id":1}
```

**返回值**

- `string`: - 待打包的交易数量


```json
result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "0x1"    //待打包的交易数量，十六进制字符串
}
```

![image-20230109111346350](C:\Users\DELL\AppData\Roaming\Typora\typora-user-images\image-20230109111346350.png)

#### 3. 返回当前群组内节点数量

**参数**

- `groupID`: `unsigned int` - 群组ID**(固定为1)**

```json
request
{"jsonrpc":"2.0","method":"getGroupPeers","params":[1],"id":1}
```

**返回值**

- `array` - 共识节点和观察节点的ID列表

```json
result
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": [
        "0c0bbd25152d40969d3d3cee3431fa28287e07cff2330df3258782d3008b876d146ddab97eab42796495bfbb281591febc2a0069dcc7dfe88c8831801c5b5801",
        "037c255c06161711b6234b8c0960a6979ef039374ccc8b723afea2107cba3432dbbc837a714b7da20111f74d5a24e91925c773a72158fa066f586055379a1772",
        "622af37b2bd29c60ae8f15d467b67c0a7fe5eb3e5c63fdc27a0ee8066707a25afa3aa0eb5a3b802d3a8e5e26de9d5af33806664554241a3de9385d3b448bcd73",
        "10b3a2d4b775ec7f3c2c9e8dc97fa52beb8caab9c34d026db9b95a72ac1d1c1ad551c67c2b7fdc34177857eada75836e69016d1f356c676a6e8b15c45fc9bc34"
    ]
}
```

计算result数组的大小即为当前群组内节点数量

![image-20230109111418148](C:\Users\DELL\AppData\Roaming\Typora\typora-user-images\image-20230109111418148.png)



#### 4. 根据区块编号返回单个区块信息

**参数**

- `groupID`: `unsigned int` - 群组ID**(固定为1)**
- `blockNumber`: `string` - 区块高度(十进制字符串或0x开头的十六进制字符串)
- `includeTransactions`: `bool` - 包含交易标志(true显示交易详细信息，false仅显示交易的hash)

**返回值：**

`object` - 区块信息，字段如下：

- `dbHash`: `string` - 记录交易数据变更的哈希
- `extraData`: `array` - 附加数据
- `gasLimit`: `string` - 区块中允许的gas最大值
- `gasUsed`: `string` - 区块中所有交易消耗的gas
- `hash`: `string` - 区块哈希
- `logsBloom`: `string` - log的布隆过滤器值
- `number`: `string` - 区块高度
- `parentHash`: `string` - 父区块哈希
- `receiptsRoot`: `string` - 区块内所有交易回执的merkle根
- `sealer`: `string` - 共识节点序号
- `sealerList`: `array` - 共识节点列表
- `signatureList`: `string` - PBFT共识的签名列表
- `stateRoot`: `string` - 状态根哈希
- `timestamp`: `string` - 时间戳，单位毫秒
- `transactions`: `array` - 交易列表，当`includeTransactions`为`false`时，显示交易的哈希。当`includeTransactions`为`true`时，显示交易详细信息（详细字段见[getTransactionByHash](https://fisco-bcos-documentation.readthedocs.io/zh_CN/latest/docs/api.html#gettransactionbyhash)）
- `transactionsRoot`: `string` - 区块内所有交易的merkle根

```json
request
{
    "jsonrpc":"2.0",
    "method":"getBlockByNumber",
    "params":[1,"0x2",true],      //"0x2"为十六进制字符串格式区块编号，true表示获取区块的详细信息
    "id":1
}
```

```json
result：
params参数为false：
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "dbHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "extraData": [],
    "gasLimit": "0x0",
    "gasUsed": "0x0",
    "hash": "0xfa639d1454362a8cdfcab1ca1948a5defaf7048b28f67e80780ab1e24e8f8c59",
    "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "number": "0x1",
    "parentHash": "0x249f59e00beac8424a7821c4750fdd70c128f4ce795afbab53f345e9fce95d1a",
    "receiptsRoot": "0x69a04fa6073e4fc0947bac7ee6990e788d1e2c5ec0fe6c2436d0892e7f3c09d2",
    "sealer": "0x0",
    "sealerList": [
      "4ca3a91a4937355dba6a2e5fe76141479a1fc44e9caa86750092dab64e0b8382f6b8476749c2d2de414350a54491620d38813d2a1442f524e36e3d9946109c4d"
    ],
    "stateRoot": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "timestamp": "0x175ac38cf10",
    "transactions": [
      "0x3961fac263d8e640b148ddcfafd71d2069e93a006abc937c32fb16cfa96e661d"
    ],
    "transactionsRoot": "0xb880b08df3b43a9ffc334d7a526522b33e004ef95403d61d76454b6085b9b2f1"
  }
}
```

```json
result:
params参数为true：
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "dbHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "extraData": [],
    "gasLimit": "0x0",
    "gasUsed": "0x0",
    "hash": "0xfa639d1454362a8cdfcab1ca1948a5defaf7048b28f67e80780ab1e24e8f8c59",
    "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "number": "0x1",
    "parentHash": "0x249f59e00beac8424a7821c4750fdd70c128f4ce795afbab53f345e9fce95d1a",
    "receiptsRoot": "0x69a04fa6073e4fc0947bac7ee6990e788d1e2c5ec0fe6c2436d0892e7f3c09d2",
    "sealer": "0x0",
    "sealerList": [
      "4ca3a91a4937355dba6a2e5fe76141479a1fc44e9caa86750092dab64e0b8382f6b8476749c2d2de414350a54491620d38813d2a1442f524e36e3d9946109c4d"
    ],
    "signatureList": [
      {
        "index": "0x0",
        "signature": "0x4602135870d9a4846e2536d4a48e831825a5d95768dd0d4f08544a0bd4c2af41242dec1751a05c07d7572027f8d6ac1625c48145beb004e2dce8b7ce9e2bb73d00"
      }
    ],
    "stateRoot": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "timestamp": "0x175ac38cf10",
    "transactions": [
      {
        "blockHash": "0xfa639d1454362a8cdfcab1ca1948a5defaf7048b28f67e80780ab1e24e8f8c59",
        "blockLimit": "0x100",
        "blockNumber": "0x1",
        "chainId": "0x1",
        "extraData": "0x",
        "from": "0x57c7be32cbfb3bfed4fddc87efcc735b4e945fb3",
        "gas": "0x2faf080",
        "gasPrice": "0xa",
        "groupId": "0x1",
        "hash": "0x3961fac263d8e640b148ddcfafd71d2069e93a006abc937c32fb16cfa96e661d",
        "input": "0x4ed3885e0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000a464953434f2042434f5300000000000000000000000000000000000000000000",
        "nonce": "0x3eb675ec791c2d19858c91d0046821c27d815e2e9c151604912205000002968",
        "signature": {
          "r": "0x9edf7c0cb63645442aff11323916d51ec5440de979950747c0189f338afdcefd",
          "s": "0x2f3473184513c6a3516e066ea98b7cfb55a79481c9db98e658dd016c37f03dcf",
          "signature": "0x9edf7c0cb63645442aff11323916d51ec5440de979950747c0189f338afdcefd2f3473184513c6a3516e066ea98b7cfb55a79481c9db98e658dd016c37f03dcf00",
          "v": "0x0"
        },
        "to": "0x8c17cf316c1063ab6c89df875e96c9f0f5b2f744",
        "transactionIndex": "0x0",
        "value": "0x0"
      }
    ],
    "transactionsRoot": "0xb880b08df3b43a9ffc334d7a526522b33e004ef95403d61d76454b6085b9b2f1"
  }
}
```

首页显示最新六个区块的部分信息(区块编号，时间戳，出块者)

![image-20230109114821066](C:\Users\DELL\AppData\Roaming\Typora\typora-user-images\image-20230109114821066.png)

#### 5. 根据区块编号返回单个区块内部所有解码后的交易信息

**参数**

- `groupID`: `unsigned int` - 群组ID**(固定为1)**
- `blockNumber`: `string` - 区块高度(十进制字符串或0x开头的十六进制字符串)
- `includeTransactions`: `bool` - 包含交易标志(**由于解码解码需要详细的交易信息，因此这里必须固定为true**)

```json
request
{
    "jsonrpc":"2.0",
    "method":"getBlockByNumber_sp",
    "params":[1,"0x2",true],      //"0x2"为十六进制字符串格式区块编号，true表示获取区块的详细信息
    "id":1
}
```

由于存在有四种类型的消息，因为result有四种json格式：

**第一种：Update APInfo FromDB**

返回值：

- `txCount`：区块内交易总数

- `transactions`：交易列表

  - `method`：交易类型

  - `txHash`：本交易的Hash

  - `apAddr`：AP基站的Address

  - `apid`：AP基站的id

  - `apLocation`：AP基站的经纬度

  - `apChannelList`：AP基站的可用信道列表

  - `apPower`：AP基站的功率

```json

{
  "txCount": 1,    //此区块内所含交易数量
  "transactions": [
    {
      "method": "Update APInfo FromDB",
      "txHash": "0xba42461b3d9890a6b78aa3268e55f9219a9f2ff602a27c7368c5fd2b5b2c5bce",
      "apAddr": "3632303030303039325f35353331323932393738",
      "apid": "620000092_55",
      "apLocation": "Lat:113.740030, Lng:40.385655",
      "apChannelList": "[47]",
      "apPower": 23
    }
  ]
}

```

**第二种：Buyer:Purchase Request**

返回值：

- `txCount`:区块内交易总数

- `transactions`：交易列表

  - `method`:交易类型

  - `txHash`：本交易的Hash

  - `buyerAPaddr`：信道购买方AP的Address

  - `buyerAPid`：信道购买方AP的id

  - `pricesList`：购买方AP认定的潜在出售的AP的Address和id

```json
{
  "txCount": 1,
  "transactions": [
    {
      "method": "Buyer:Purchase Request",
      "txHash": "0xe6c5221cc97df6ff5764c7de5fa71afd6f486c42da7664a93613a6c1b8ee0666",
      "buyerAPaddr": "3632303030303039315f35353730303139373933",
      "buyerAPid": "620000091_55",
      "pricesList": "SellerAPaddr:3632303030303039335f35353739353234373334 || SellerAPid:620000093_55"
    }
  ]
}

```

**第三种：Seller:Willingness to sell**

返回值：

- `txCount`:区块内交易总数

- `transactions`：交易列表

  - `method`:交易类型

  - `txHash`：本交易的Hash

  - `buyerAPaddr`：信道购买方AP的Address

  - `buyerAPid`：信道购买方AP的id

  - `sellerAPaddr`：信道出售方AP的Address
  - `sellerAPid`：信道出售方AP的id
  - `switchChannels`：信道出售方意图出售的信道

```json
{
  "txCount": 1,
  "transactions": [
    {
      "method": "Seller:Willingness to sell",
      "txHash": "0x1b338313b4291276e29149f392828c0009519cc8cb42a711c1824763b5f8d9f4",
      "buyerAPaddr": "3632303030303039315f35353730303139373933",
      "buyerAPid": "620000091_55",
      "sellerAPaddr": "3632303030303039335f35353739353234373334",
      "sellerAPid": "620000093_55",
      "switchChannels": [
        38
      ]
    }
  ]
}
```

**第四种：Transaction Confirm**

返回值：

- `txCount`:区块内交易总数

- `transactions`：交易列表

  - `method`:交易类型

  - `txHash`：本交易的Hash

  - `buyerAPaddr`：信道购买方AP的Address

  - `buyerAPid`：信道购买方AP的id

  - `sellerAPaddr`：信道出售方AP的Address
  - `sellerAPid`：信道出售方AP的id
  - `switchChannels`：信道出售方确认被出售的信道

```json
{
  "txCount": 1,
  "transactions": [
    {
      "method": "Transaction Confirm",
      "txHash": "0xcc5967d8ac0c18b9e7ab2d8f9bcd6a7b561c6ebd75f97aa334ce5c125bc43c36",
      "buyerAPaddr": "3632303030303039315f35353730303139373933",
      "buyerAPid": "620000091_55",
      "sellerAPaddr": "3632303030303039335f35353739353234373334",
      "sellerAPid": "620000093_55",
      "switchChannels": [
        38
      ]
    }
  ]
}
```

**第五种：Update database**

返回值：

- `txCount`:区块内交易总数

- `transactions`：交易列表

  - `method`:交易类型

  - `txHash`：本交易的Hash

  - `apAddr`：需要进行信息更新的AP基站的Address

```json
{
  "txCount": 4,
  "transactions": [
    {
      "method": "Update database",
      "txHash": "0x65fbea22466c3a3d8b0fadfb5cc0c6dae419345350cf10a00a6c29871c708d8e",
      "apAddr": "3632303030303039315f35353730303139373933"
    },
    {
      "method": "Update database",
      "txHash": "0xc6affdf7056142c359428caffa2b0a096c421ae0be6fa2d542b73f43ab14c887",
      "apAddr": "3632303030303039315f35353730303139373933"
    },
    {
      "method": "Update database",
      "txHash": "0x4b77fc37b48ed4111b225adf77c0b495b5d7816feab2219053c90292643718b5",
      "apAddr": "3632303030303039315f35353730303139373933"
    },
    {
      "method": "Update database",
      "txHash": "0x1764cb6d29884df9173127d0dd9677eca7560e30c976088c2b9d4d7296e5042b",
      "apAddr": "3632303030303039315f35353730303139373933"
    }
  ]
}
```

点击区块可以查看具体的解码的交易信息(结合使用4/5json消息)

**红框中的信息即为5号json消息回复中解码的区块内交易，其余皆为使用4号json消息获取的信息。**

![image-20230109115458116](C:\Users\DELL\AppData\Roaming\Typora\typora-user-images\image-20230109115458116.png)



#### 6. 获取现有的所有区块

**参数**

无

```json
{"jsonrpc":"2.0","method":"getBlockByNumber_all","params":[],"id":1}
```

**返回值：**

按顺返回所有区块，每个区块按照4.中的`true`方式json消息返回的回复



在blockInfo页面分页显示所有区块：

![image-20230109115401581](C:\Users\DELL\AppData\Roaming\Typora\typora-user-images\image-20230109115401581.png)



#### 7. 根据用户输入的区块编号获取区块

①捕获用户输入的十进制数值型区块编号  ②将其转化为十六进制字符串  ③分别使用json消息4与json消息5获取区块的信息和具体解码的交易信息。

![image-20230109134731262](C:\Users\DELL\AppData\Roaming\Typora\typora-user-images\image-20230109134731262.png)

![image-20230109134748882](C:\Users\DELL\AppData\Roaming\Typora\typora-user-images\image-20230109134748882.png)

输入区块编号后，跳转至：

![image-20230109115458116](C:\Users\DELL\AppData\Roaming\Typora\typora-user-images\image-20230109115458116.png)
