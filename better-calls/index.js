(function(exports,plugin){"use strict";const vstorage=plugin.storage;let unpatchCallRing,unpatchSilentCallToggleButton;var index={onLoad:function(){const{metro,api}=bunny,callModule=metro.findByPropsLazy("call","ring","stopRinging"),PrivateChannelButtons=metro.findByTypeNameLazy("PrivateChannelButtons"),{IconButton}=metro.findByPropsLazy("IconButton");if(!callModule||!PrivateChannelButtons||!IconButton)return alert(`Better Calls failed to start, modules list:
callModule: ${callModule}
PrivateChannelButtons: ${PrivateChannelButtons}
IconButton: ${IconButton}`);unpatchSilentCallToggleButton=api.patcher.after("type",PrivateChannelButtons,function(param,rt){let[{channelId}]=param;const[silenced,setSilenced]=React.useState(vstorage[channelId]??!1),fragmentProps=rt.props.children[0].props;fragmentProps.children&&(fragmentProps.children=[React.createElement(IconButton,{key:"silent-call-toggle",icon:api.assets.findAssetId(silenced?"ic_notif_off":"ic_notif"),onPress:function(){vstorage[channelId]=!silenced,setSilenced(!silenced)},variant:silenced?"primary":"secondary",size:"sm"}),...fragmentProps.children])}),unpatchCallRing=api.patcher.instead("ring",callModule,function(args,ring){if(!vstorage[args[0]])return ring.apply(callModule,args)})},onUnload:function(){unpatchCallRing(),unpatchSilentCallToggleButton()},settings:function(){return React.createElement(ReactNative.Text,null,"Other features than silent calls are coming soon.")}};return exports.default=index,exports.vstorage=vstorage,Object.defineProperty(exports,"__esModule",{value:!0}),exports})({},vendetta.plugin);
