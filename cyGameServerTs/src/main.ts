
let InitModule : nkruntime.InitModule = 
    function(
        ctx : nkruntime.Context,
        logger : nkruntime.Logger,
        nk : nkruntime.Nakama,
        initializer : nkruntime.Initializer
    ) {
        logger.info("Typescript module loaded!");
    }


var CmsConfig = {
    remoteUrl: "http://localhost:3000/api/client-cache/update" 
}

