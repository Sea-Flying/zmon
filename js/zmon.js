var api_url = "http://10.1.62.243/zabbix/api_jsonrpc.php";
var api_admin = "admin";
var api_pass = "zabbix";
var selectedhost = "";
var selecteditem_1 = "";
var selecteditem_2 = "";
var params_host_get = {"output":["hostid","host"]};
var params_item_get = {"hostids":"","output":["itemid","key_","name"],"application":"Wonders","search":{"key_":""}};
var item2_list = {
'system.cpu.' :
    '<option value="c">使用率</option>',
 'vm.memory.':
    '<option value="a">占用率</option>' +
    '<option value="b">占用量</option>',
 'vfs.fs.':
    '<option value="d">c盘百分比</option>'+
    '<option value="e">d盘百分比</option>',
 'net.if.total':
    '<option value="f">流量</option>',
 'perf_counter':
    '<option value="g">Chrome使用时长</option>'
};

function wrap_item_params(origin,host,item_1,item_2) {
    origin.hostids = host;
    origin.search.key_ = item_1 + item_2;
    return origin;
}

var api_methods = {

    action: {
        'get': ['actionids','groupids','hostids','triggerids','mediatypeids','usrgrpids','userids','scriptids','selectConditions','selectOperations','sortfield','countOutput','editable','excludeSearch','filter','limit','output','preservekeys','search','searchByAny','searchWildcardsEnabled','sortorder','startSearch'],
        'exixts': ['actionid','name'],
        //'create': [],
        //'update': [],
        'delete': ['actionids']
    },

    alert: {
        'get': ['alertids','actionids','eventids','groupids','hostids','mediatypeids','objectids','userids','eventobject','eventsource','time_from','time_till','selectHosts','selectMediatypes','selectUsers','sortfield','countOutput','editable','excludeSearch','filter','limit','output','preservekeys','search','searchByAny','searchWildcardsEnabled','sortorder','startSearch'],
        //'create': [],
    },

    apiinfo: {
        'version': []
    },

    application: {
        'get': ['applicationids','groupids','hostids','inherited','itemids','templated','templateids','expandData','selectHosts','selectItems','sortfield','countOutput','editable','excludeSearch','filter','limit','output','preservekeys','search','searchByAny','searchWildcardsEnabled','sortorder','startSearch'],
        'exists': ['hostid','name'],
        //'create': [],
        //'update': [],
        'delete': ['applicationids']
    },

    DHost: {
        'get': ['dhostids','druleids','dserviceids','selectDRules','selectDServices','limitSelects','sortfield','countOutput','editable','excludeSearch','filter','limit',,'output','preservekeys','search','searchByAny','searchWildcardsEnabled','sortorder','startSearch'],
        'exists': ['dhostid']
    },

    DService: {
        'get': ['dserviceids','dhostids','dcheckids','druleids','selectDRules','selectDHosts','selectHosts','limitSelects','sortfield','countOutput','editable','excludeSearch','filter','limit','output','preservekeys','search','searchByAny','searchWildcardsEnabled','sortorder','startSearch'],
        'exists': ['dserviceid']
        //'create': [],
        //'update': [],
    },

    DCheck: {
        'get': ['dcheckids','druleids','dserviceids','sortfield','countOutput','editable','excludeSearch','filter','limit','output','preservekeys','search','searchByAny','searchWildcardsEnabled','sortorder','startSearch']
    },

    Drule: {
        'get': ['dhostids','druleids','dserviceids','selectDChecks','selectDHosts','limitSelects','sortfield','countOutput','editable','excludeSearch','filter','limit','output','preservekeys','search','searchByAny','searchWildcardsEnabled','sortorder','startSearch'],
        'exists': ['druleids','name'],
        //'create': [],
        //'update': [],
        'delete': ['druleids','name']
    },

    event: {
        'get': ['eventids','groupids','hostids','objectids','object','acknowledged','eventid_from','eventid_till','source','time_from','time_till','value','selectHosts','selectRelatedObject','select_alerts','select_acknowledges','sortfield','countOutput','editable','excludeSearch','filter','limit','output','preservekeys','search','searchByAny','searchWildcardsEnabled','sortorder','startSearch'],
        'acknowledge': ['eventids','message']
        //'create': [],
    },

    graph: {
        'get': ['graphids','groupids','templateids','hostids','itemids','templated','inherited','expandName','selectGroups','selectTemplates','selectHosts','selectItems','selectGraphItems','selectDiscoveryRule','filter','sortfield','countOutput','editable','excludeSearch','limit','output','preservekeys','search','searchByAny','searchWildcardsEnabled','sortorder','startSearch'],
        'exists': ['host','hostids','name'],
        //'create': [],
        //'update': [],
        'delete': ['graphids']
    },

    graphitem: {
        'get': ['gitemids','graphids','itemids','type','expandData','selectGraphs','sortfield','countOutput','editable','limit','output','preservekeys','sortorder']
    },

    graphprototype: {
        'get': ['discoveryids','graphids','groupids','hostids','inherited','itemids','templated','templateids','selectDiscoveryRule','selectGraphItems','selectGroups','selectHosts','selectItems','selectTemplates','filter','sortfield','countOutput','editable','excludeSearch','limit','output','preservekeys','search','searchByAny','searchWildcardsEnabled','sortorder','startSearch'],
        'exists': ['host','hostids','name'],
        'delete': ['graphprototypeids']
    },

    history: {
        'get': ['history','hostids','itemids','time_from','time_till','sortfield','countOutput','editable','excludeSearch','filter','limit','output','search','searchByAny','searchWildcardsEnabled','sortorder','startSearch']
    },

    host: {
        'get': ['groupids','applicationids','dserviceids','graphids','hostids','httptestids','interfaceids','itemids','maintenanceids','monitored_hosts','proxy_hosts','proxyids','templated_hosts','templateids','triggerids','with_items','with_applications','with_graphs','with_httptests','with_monitored_httptests','with_monitored_items','with_monitored_triggers','with_simple_graph_items','with_triggers','withInventory','selectGroups','selectApplications','selectDiscoveries','selectDiscoveryRule','selectGraphs','selectHostDiscovery','selectHttpTests','selectInterfaces','selectInventory','selectItems','selectMacros','selectParentTemplates','selectScreens','selectTriggers','filter','limitSelects','search','sortfield','countOutput','editable','excludeSearch','limit','output','preservekeys','searchByAny','searchWildcardsEnabled','sortorder','startSearch'],
        'exists': ['nodeids','hostid','host'],
        //'create': [],
        //'update': [],
        'delete': ['hostids'],
        //'massAdd': [],
        //'massUpdate': [],
        //'massRemove': []
    },

    hostgroup: {
        'get': ['nodeids','groupids','hostids','templateids','triggerids','graphids','proxyids','maintenanceids','monitored_hosts','templated_hosts','real_hosts','not_proxy_hosts','with_items','with_monitored_items','with_historucal_items','with_triggers','woth_monitored_triggers','with_httptests','with_monitored_httptests','with_graphs','editable','filter','search','startSearch','excludeSearch','output','select_templates','select_hosts','countOutput','groupOutput','preservekeys','sortfield','sortorder','limit'],
        'exists': ['nodeids','groupid','name'],
        //'create': [],
        //'update': [],
        //'massAdd': [],
        //'massUpdate': [],
        //'massRemove': [],
        'delete': ['groupids']
    },

    image: {
        'get': ['nodeids','imageids','sysmapids','editable','filter','pattern','startPattern','excludePattern','output','select_image','countOutput','preservekeys','sortfield','sortorder','limit'],
        'exists': ['nodeids','imageid','name','imagetype'],
        //'create': [],
        //'update': [],
        'delete': ['imageids']
    },

    item: {
        'get': ['nodeids','groupids','hostids','templateids','proxyids','itemids','graphids','triggerids','applicationids','webitems','inherited','templated','monitored','editable','filter','group','host','application','belongs','with_triggers','search','startSearch','excludeSearch','output','select_hosts','select_triggers','select_graphs','select_applications','countOutput','groupOutput','preservekeys','sortfield','sortorder','limit'],
        'exists': ['nodeids','key_','hostid','host'],
        //'create': [],
        //'update': [],
        'delete': ['itemids']
    },

    maintenance: {
        'get': ['nodeids','groupids','hostids','maintenanceids','editable','filter','pattern','startPattern','excludePattern','output','select_groups','select_hosts','countOutput','groupOutput','preservekeys','sortfield','sortorder','limit'],
        'exists': ['nodeids','maintenanceid','maintenance'],
        //'create': [],
        //'update': [],
        'delete': ['maintenanceids']
    },

    map: {
        'get': ['nodeids','sysmapids','editable','filter','search','startSearch','excludeSearch','output','select_selements','select_links','countOutput','preservekeys','sortfield','sortorder','limit'],
        'exists': ['nodeids','sysmapid','name'],
        //'create': [],
        //'update': [],
        'delete': ['sysmapids']
    },

    mediatype: {
        'get': ['nodeids','userids','mediaids','mediatypeids','editable','filter','search','startSearch','excludeSearch','output','select_users','select_medias','countOutput','preservekeys','sortfield','sortorder','limit'],
        //'create': [],
        //'update': [],
        'delete': ['mediatypeids']
    },

    proxy: {
        'get': ['nodeids','proxyids','editable','filter','search','startSearch','excludeSearch','output','select_hosts','countOutput','preservekeys','sortfield','sortorder','limit'],
        //'create': [],
        'delete': ['proxyids']
    },

    screen: {
        'get': ['nodeids','screenids','screenitemids','type','editable','filter','search','startSearch','excludeSearch','output','select_screenitems','countOutput','preservekeys','sortfield','sortOrder','limit'],
        'exists': ['nodeids','screenid','name'],
        //'create': [],
        //'update': [],
        'delete': ['screenids']
    },

    script : {
        'get': ['nodeids','groupids','hostids','scriptids','editable','filter','search','startSearch','excludeSearch','output','select_groups','select_hosts','countOutput','preservekeys','sortfield','sortorder','limit'],
        'execute': ['scriptid','hostid'],
        //'create': [],
        //'update': [],
        'delete': ['scriptids']
    },

    template: {
        'get': ['nodeids','groupids','templateids','parentTemplateids','hostids','itemids','triggerids','graphids','proxyids','maitenanceids','with_items','with_triggers','with_graphs','editable','filter','search','startSearch','excludeSrarch','output','select_groups','selectParentTemplates','select_templates','select_hosts','select_items','select_triggers','select_graphs','select_applications','select_macros','countOutput','groupOutput','preservekeys','sortfield','sortorder','limit'],
        'exists': ['nodeids','hostid','host'],
        //'create': [],
        //'update': [],
        //'massAdd': [],
        //'massUpdate': [],
        //'massRemove': [],
        'delete': ['templateids']
    },

    trigger: {
        'get': ['nodeids','groupids','templateids','hostids','triggerids','itemids','applicationids','functions','inherited','templated','monitored','active','maintenance','withUnacknowledgedEvents','withAcknowledgedEvents','withLastEventUnacknowledged','skipDependent','editable','lastChangeSince','lastChangeTill','filter','group','host','only_true','min_severity','search','startSearch','excludeSearch','output','expandData','expandDescription','select_groups','select_hosts','select_items','select_functions','select_dependencies','countOutput','groupOutput','preservekeys','sortfield','sortorder','limit'],
        'exists': ['nodeids','description','expression','hostid','host'],
        //'create': [],
        //'update': [],
        'delete': ['triggerids'],
        'addDependencies': ['triggerid','dependsOnTriggerid'],
        'deleteDependencies': ['triggerids']
    },

    user: {
        'get': ['nodeids','usrgrpids','userids','mediaids','mediatypeids','editable','filter','search','startSearch','excludeSearch','output','select_usrgrps','select_medias','select_mediatypes','get_graphs','countOutput','groupOutput','preservekeys','sortfield','sortorder','limit'],
        //'create': [],
        //'update': [],
        //'updateProfile': [],
        'delete': ['userids'],
        //'addMedia': [],
        //'updateMedia': [],
        //'deleteMedia': [],
        'authenticate': [],
        'login': ['user','password'],
        'logout': []
    },

    usergroup: {
        'get': ['nodeids','usrgrpids','userids','status','with_gui_access','with_api_access','editable','filter','pattern','startPattern','excludePattern','select_users','output','countOutput','preservekeys','sortfield','sortorder','limit'],
        'exists': ['nodeids','usrgrpid','name'],
        //'create': [],
        //'update': [],
        //'massAdd': [],
        //'massUpdate': [],
        //'massRemove': [],
        'delete': ['usrgrpids']
    },

    usermacro: {
        'get': ['nodeids','groupids','hostids','templateids','hostmacroids','globalmacroids','globalmacro','editable','filter','pattern','startPattern','excludePattern','output','select_groups','select_hosts','select_templates','countOutput','preservekeys','sortfield','sortorder','limit'],
        //'createGlobal': [],
        //'updateGlobal': [],
        //'massAdd': [],
        //'massUpdate': [],
        //'massRemove': [],
        'deleteGlobal': ['grobalmacroids'],
        'deleteHostMacro': ['hostmacroids']
    }
// end parameters
};

