let server_port = process.env.PORT || 9000

export default {
    prefix: "!",
    port: server_port,
    token: process.env.DISCORD_TOKEN,
    mongoURI: process.env.MONGO_URI,
    stockURL: "https://stock-data-api.now.sh/",
    fakeNewsURL: "https://us-central1-openvpn-238104.cloudfunctions.net/function-2",
    stockPriceUrl: 'https://my-go-project.davidli012345.now.sh/api',
    stockQuotes: 'quotes=BB.TO,NEXCF,ABT.TO,AT.TO,ACB.TO,WMT.TO,CGC,NXTTF,OCFT,DDOG,HVBTF,DCSI',
    stockChannel: "571860897887289410"
}
