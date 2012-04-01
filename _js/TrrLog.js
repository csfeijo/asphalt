TrrLog = {
	enable: false,
    __verifyEnable: function (app){
        appLower = (app===undefined)?"":app.toLowerCase();
        if(TrrLog.enable===false || (appLower==undefined && TrrLog.enable===false))
            return false;
        if(TrrLog.enable===true || appLower===true || appLower==TrrLog.enable.toLowerCase())
			return true;
		else
			return false;
	},
	__formatMsg: function (msg,app) {
        return (app!=undefined) ? "["+app+"] "+msg : msg;
    },
	log: function (msg,app) {
		if (TrrLog.__verifyEnable(app)) {
            msgApp  = TrrLog.__formatMsg(msg,app);
            try { console.log(msgApp); } catch (e) { try { opera.postError(msgApp);  } catch (e) {} }
		}
	},
	debug: function (msg,app) {
		if (TrrLog.__verifyEnable(app)) {
            msgApp  = TrrLog.__formatMsg(msg,app);
            try { console.debug(msgApp); } catch (e) { TrrLog.log("DEBUG: "+msg,app); }
		}
	},
	info: function (msg,app) {
		if (TrrLog.__verifyEnable(app)) {
            msgApp  = TrrLog.__formatMsg(msg,app);
            try { console.info(msgApp); } catch (e) { TrrLog.log("INFO: "+msg,app); }
		}
	},
	warn: function (msg,app) {
		if (TrrLog.__verifyEnable(app)) {
            msgApp  = TrrLog.__formatMsg(msg,app);
            try { console.warn(msgApp); } catch (e) { TrrLog.log("WARN: "+msg,app); }
		}
	},
	error: function (msg,app) {
		if (TrrLog.__verifyEnable(app)) {
            msgApp  = TrrLog.__formatMsg(msg,app);
            try { console.error(msgApp); } catch (e) { TrrLog.log("ERROR: "+msg,app); }
		}
	}
};