<template>
  <div>
    <Row  :gutter="16" type="flex" justify="center" align="top">
        <Col span="11" style="border: #f0f0f0 1px solid; margin:5px;">
          <Tree :data="orgTreeData" :render="renderContent"></Tree>
        </Col>
        <Col span="11" style="border: #f0f0f0 1px solid; margin:5px;padding:5px;">
          <Form ref="organization" :model="organization" :label-width="100" >
            <Row type="flex" justify="center" :gutter="16">
                <Col span="18">
                    <FormItem prop="title" label="部门名称">
                        <Input type="text" v-model="organization.title" placeholder="部门名称">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="description" label="部门描述">
                        <Input type="text" v-model="organization.description" placeholder="部门描述">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    
                    <hr style="margin-bottom:15px;"></hr>
                    <FormItem prop="groups" label="工作组">
                        <Select ref="groupSelect"
                            v-model="organization.groups" multiple filterable remote :remote-method="remoteGroupMethod" :label-in-value="true"
                            :loading="groupLoading" :label="currentGroupNames" @on-change="groupChange">
                            <Option v-for="(option, index) in groupOptions" :value="option.value" :key="index">{{option.label}}</Option>
                        </Select>
                    </FormItem>
                    <hr style="margin-bottom:15px;"></hr>
                    <FormItem prop="users" label="人员">
                        <Select ref="userSelect"
                            v-model="organization.users" multiple filterable remote :remote-method="remoteUserMethod" :label-in-value="true"
                            :loading="userLoading" :label="currentUserNames" @on-change="userChange">
                            <Option v-for="(option, index) in userOptions" :value="option.value" :key="index">{{option.label}}</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
                
            </Form>

        </Col>
    </Row>
    <Row >
        <Col span="6" offset="17">
            <Button type="primary" @click="saveOrganizations()">保存机构配置</Button>
        </Col>
    </Row>
  </div>
</template>
<script>
import Vue from 'vue'
import util from '@/libs/util.js';

var treeLeafFontSize = '12pt';
    export default {
        components: {
            
        },
        data () {
            return {
                orgTreeData: [
                    {
                        title: 'parent 1',
                        description: 'Level 1',
                        id: 1,
                        groups: [],
                        groupsObj: [],
                        users: [],
                        usersObj:[],
                        expand: true,
                        render: (h, { root, node, data }) => {
                            return h('span', {
                                style: {
                                    display: 'inline-block',
                                    width: '100%'
                                }
                            }, [
                                h('span', [
                                    h('Icon', {
                                        props: {
                                            type: 'ios-folder-outline'
                                        },
                                        style: {
                                            marginRight: '8px'
                                        }
                                    }),
                                    h('span', {style: { cursor: 'pointer',fontSize: treeLeafFontSize}, on: { click: (event) => { 
                                        this.organization = node.node;
                                        //event.target.style.backgroundColor = "#0ff";
                                    } } } , data.title)
                                ]),
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        float: 'right',
                                        marginRight: '32px'
                                    }
                                }, [
                                    h('Button', {
                                        props: Object.assign({}, this.buttonProps, {
                                            icon: 'ios-plus-empty',
                                            type: 'primary'
                                        }),
                                        style: {
                                            // width: '52px'
                                            marginRight: '8px'
                                        },
                                        on: {
                                            click: () => { this.append(data) }
                                        }
                                    })
                                ])
                            ]);
                        },
                        children: [
                            {
                                title: 'child 1-1',
                                id: 2,
                                expand: true,
                                groups: [],
                                groupsObj: [],
                                users: [],
                                usersObj:[],
                                description: 'child 1-1 position',
                                children: [
                                    {
                                        title: 'leaf 1-1-1',
                                        expand: true,
                                        id: 3,
                                        groups: [],
                                        groupsObj: [],
                                        users: [],
                                        usersObj:[],
                                        description: 'leaf 1-1-1 position'
                                    },
                                    {
                                        title: 'leaf 1-1-2',
                                        expand: true,
                                        id: 4,
                                        groups: [],
                                        groupsObj: [],
                                        users: [],
                                        usersObj:[],
                                        description: 'leaf 1-1-2 position'
                                    }
                                ]
                            }
                        ]
                    }
                ],
                buttonProps: {
                    type: 'ghost',
                    size: 'small',
                },
                organization : {
                    title : '',
                    description: '',
                    groups: [],
                    groupsObj: [],
                    users: [],
                    usersObj:[]
                },
                groupLoading : false,
                userLoading: false,
                groupOptions : [],
                userOptions : []
        
            }
        },
        computed: {
            currentGroupNames : function(){
                var names = [];
                if( this.organization.groupsObj == null ){
                    this.organization.groupsObj = [];
                }
                for( var i=0; i<this.organization.groupsObj.length; i++ ){
                    names.push( this.organization.groupsObj[i].label);
                }
                return names;
            },
            currentUserNames: function(){
                var names = [];
                if( this.organization.usersObj == null ){
                    this.organization.usersObj = [];
                }
                for( var i=0; i<this.organization.usersObj.length; i++ ){
                    names.push( this.organization.usersObj[i].label);
                }
                return names;
            }
        },
        methods: {
            renderContent (h, { root, node, data }) {
                return h('span', {
                    style: {
                        display: 'inline-block',
                        width: '100%',
                        fontSize: treeLeafFontSize
                    }
                }, [
                    h('span', [
                        h('Icon', {
                            props: {
                                type: 'ios-paper-outline'
                            },
                            style: {
                                marginRight: '8px'
                            }
                        }),
                        h('span', {style: { cursor: 'pointer',fontSize: treeLeafFontSize}, on: { click: (event) => { 
                            this.organization = node.node;
                        } } } , data.title)
                    ]),
                    h('span', {
                        style: {
                            display: 'inline-block',
                            float: 'right',
                            marginRight: '32px'
                        }
                    }, [
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-plus-empty'
                            }),
                            style: {
                                marginRight: '8px'
                            },
                            on: {
                                click: () => {
                                    this.append(data) 
                                }
                            }
                        }),
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-minus-empty'
                            }),
                            on: {
                                click: () => { this.remove(root, node, data) }
                            }
                        })
                    ])
                ]);
            },
            append (data) {
                const children = data.children || [];
                children.push({
                    title: 'appended node',
                    expand: true,
                    id: maxLeafId(this.orgTreeData)+1,
                    groups: [],
                    groupsObj:[],
                    users: new Array(),
                    usersObj: []
                });
                this.$set(data, 'children', children);
            },
            remove (root, node, data) {
                const parentKey = root.find(el => el === node).parent;
                const parent = root.find(el => el.nodeKey === parentKey).node;
                const index = parent.children.indexOf(data);
                parent.children.splice(index, 1);
            },
            remoteGroupMethod (query) {
                var vm = this;
                if (query !== '') {
                    var params = query +'###1#@#'+ query +'###1';
                    util.pageUrlAction('/api/system/cscpWorkGroups/query', params, 0, 1000000).then(function(data){
                        //alert(data.length);
                        var op = [];
                        for( var i=0; i<data.data.length; i++){
                            op.push({value:data.data[i].id, label: data.data[i].group_name });
                        }
                        vm.groupOptions = op;
                    });
                } else {
                    vm.groupOptions = [];
                }
            },
            groupChange(data){
                util.syncArray(data, this.organization.groupsObj);
                // for( var i=0; i<data.length; i++){
                //     putObjToArray ( data[i], this.organization.groupsObj );
                // }
            },
            remoteUserMethod( query ){
                var vm = this;
                if (query !== '') {
                    var params = query+'###1#@#'+ query +'###1#@#'+ query +'###1#@#'+ query +'###1#@#'+ query +'###1#@#'+ query +'###1#@#'+ query +'###1';
                    util.pageUrlAction('/api/system/user/query', params, 0, 1000000).then(function(data){
                        var op = [];
                        for( var i=0; i<data.data.length; i++){
                            op.push({value:data.data[i].id, label: data.data[i].family_name+" "+data.data[i].name+"("+data.data[i].username+")("+data.data[i].mobile+")" });
                        }
                        vm.userOptions = op;
                        vm.organization.users = [];
                    });
                } else {
                    vm.userOptions = [];
                }
                
            },
            userChange(data){
                util.syncArray(data, this.organization.usersObj);
            },
            saveOrganizations(){
                var vm = this;
                this.$Spin.show();
                var orgs = [], groups = [], users = [];
                for( var i=0; i<this.orgTreeData.length; i++){
                    generateData(this.orgTreeData[i], orgs, groups, users, null);
                }
                logArray(orgs);
                logArray(groups);
                logArray(users);
                var params = {cscpOrgDTOs:orgs, cscpUserOrgDTOs: users, cscpWorkGroupOrgDTOs:groups };
                util.ajaxMethodWidthParams(util.baseUrl+'/api/system/cscpOrgs/save', "POST", params).then(function(data){
                    vm.$Spin.hide();
                    if( data.success){
                        vm.$Notice.info({title: '提示',desc: '保存成功!'});
                    }else{
                        vm.$Notice.info({title: '提示',desc: '保存失败：'+data.msg});
                    }
                });
            },
            fetchData(){
                var vm = this;
                this.$Spin.show();
                util.ajaxMethodWidthParams(util.baseUrl+'/api/system/cscpOrgs/all', "GET", {}).then(function(data){
                    var d = formatFetchedData ( data );
                    vm.orgTreeData = d;
                    vm.organization = vm.orgTreeData[0];
                    vm.$Spin.hide();
                }).catch(error=>{
                    vm.$Spin.hide();
                });
            }
            
        },
        created () {
            this.fetchData();
            //this.organization = this.orgTreeData[0];
        }
    }

    function logArray(arr){
    }

    function generateData(node, orgs, groups, users, parentId){
        var org = {};
        org.id = node.id;
        org.orgName = node.title;
        org.description = node.description;
        org.parentId = parentId;
        orgs.push(org);
        if( node.users != null){
            for( var i=0; i<node.users.length; i++){
                var user = {};
                user.userId = node.users[i];
                user.orgId = node.id;
                users.push(user);
            }
        }
        if( node.groups != null ){
            for( var i=0; i<node.groups.length; i++){
                var group = {};
                group.groupId = node.groups[i];
                group.orgId = node.id;
                groups.push(group);
            }
        }
        if( node.children!=null){
            for( var i=0; i<node.children.length; i++){
                generateData(node.children[i], orgs, groups, users, node.id);
            }
        }
    }
    function formatFetchedData(data){
        var d = {};
        var userObjArray = new Array();
        for( var i=0; i<data.cscpUserDetailDTOs.length; i++){
            userObjArray[data.cscpUserDetailDTOs[i].userId] = data.cscpUserDetailDTOs[i];
            userObjArray[data.cscpUserDetailDTOs[i].userId].value = data.cscpUserDetailDTOs[i].userId;
            userObjArray[data.cscpUserDetailDTOs[i].userId].label = formatData2Option2(data.cscpUserDetailDTOs[i]);
        }
        var orgUserArray = [];
        for( var i=0; i<data.cscpUserOrgDTOs.length; i++){
            if( orgUserArray[data.cscpUserOrgDTOs[i].orgId] == null){
                orgUserArray[data.cscpUserOrgDTOs[i].orgId] = {};
            }
            if( orgUserArray[data.cscpUserOrgDTOs[i].orgId].users == null){
                orgUserArray[data.cscpUserOrgDTOs[i].orgId].users = [];
            }
            if( orgUserArray[data.cscpUserOrgDTOs[i].orgId].usersObj == null){
                orgUserArray[data.cscpUserOrgDTOs[i].orgId].usersObj = [];
            }
            orgUserArray[data.cscpUserOrgDTOs[i].orgId].users.push(data.cscpUserOrgDTOs[i].userId);
            orgUserArray[data.cscpUserOrgDTOs[i].orgId].usersObj.push(userObjArray[data.cscpUserOrgDTOs[i].userId]);
        }
        
        var workGroupArray = new Array();
        for( var i=0;i<data.cscpWorkGroupDTOs.length; i++){
            workGroupArray[data.cscpWorkGroupDTOs[i].id] = data.cscpWorkGroupDTOs[i];
            workGroupArray[data.cscpWorkGroupDTOs[i].id].value = data.cscpWorkGroupDTOs[i].id;
            workGroupArray[data.cscpWorkGroupDTOs[i].id].label = data.cscpWorkGroupDTOs[i].groupName;
        }
        var orgWorkGroupArray = [];
        for( var i=0; i<data.cscpWorkGroupOrgDTOs.length; i++){
            if( orgWorkGroupArray[data.cscpWorkGroupOrgDTOs[i].orgId] == null){
                orgWorkGroupArray[data.cscpWorkGroupOrgDTOs[i].orgId] = {};
            }
            if( orgWorkGroupArray[data.cscpWorkGroupOrgDTOs[i].orgId].groups == null){
                orgWorkGroupArray[data.cscpWorkGroupOrgDTOs[i].orgId].groups = [];
            }
            if( orgWorkGroupArray[data.cscpWorkGroupOrgDTOs[i].orgId].groupsObj == null){
                orgWorkGroupArray[data.cscpWorkGroupOrgDTOs[i].orgId].groupsObj = [];
            }
            orgWorkGroupArray[data.cscpWorkGroupOrgDTOs[i].orgId].groups.push(data.cscpWorkGroupOrgDTOs[i].groupId);
            orgWorkGroupArray[data.cscpWorkGroupOrgDTOs[i].orgId].groupsObj.push( workGroupArray[data.cscpWorkGroupOrgDTOs[i].groupId] );
        }
        
        var isbreak = false;
        for( var i=0; i<data.cscpOrgDTOs.length; i++){
            if( data.cscpOrgDTOs[i].parentid == null){
                d = data.cscpOrgDTOs.splice(i, 1)[0];

                d.nodeKey = d.id;
                d.title = d.orgName;
                d.expand = true;
                if(orgWorkGroupArray[d.id] == null){
                    orgWorkGroupArray[d.id] = {};
                    orgWorkGroupArray[d.id].groups = [];
                    orgWorkGroupArray[d.id].groupsObj = [];
                }
                d.groups = orgWorkGroupArray[d.id].groups;
                d.groupsObj = orgWorkGroupArray[d.id].groupsObj;
                if( orgUserArray[d.id] == null){
                    orgUserArray[d.id] = {};
                    orgUserArray[d.id].users = [];
                    orgUserArray[d.id].usersObj = [];
                }
                d.users = orgUserArray[d.id].users;
                d.usersObj= orgUserArray[d.id].usersObj;
                while( data.cscpOrgDTOs.length>0){
                    treeGenerate(d, data.cscpOrgDTOs,orgUserArray, orgWorkGroupArray);
                }
                isbreak = true;
            }
            if( isbreak == true) break;
        }
        return [d];
    }
    function treeGenerate(root, leafs,orgUserArray,orgWorkGroupArray){
        if( root.children == null) root.children = [];
        for( var i=0; i<leafs.length; i++){
            if( leafs[i].parentId == root.id ){
                var has = true;
                var leaf = leafs.splice(i, 1)[0];
                leaf.nodeKey = leaf.id;
                leaf.title = leaf.orgName;
                leaf.expand = true;
                if(orgWorkGroupArray[leaf.id] == null){
                    orgWorkGroupArray[leaf.id] = {};
                    orgWorkGroupArray[leaf.id].groups = [];
                    orgWorkGroupArray[leaf.id].groupsObj = [];
                }
                leaf.groups = orgWorkGroupArray[leaf.id].groups;
                leaf.groupsObj = orgWorkGroupArray[leaf.id].groupsObj;
                if( orgUserArray[leaf.id] == null){
                    orgUserArray[leaf.id] = {};
                    orgUserArray[leaf.id].users = [];
                    orgUserArray[leaf.id].usersObj = [];
                }
                leaf.users = orgUserArray[leaf.id].users;
                leaf.usersObj= orgUserArray[leaf.id].usersObj;
                root.children.push(leaf);
                return true;
            }
            for( var j=0;j<root.children.length; j++){
                var hasChild = treeGenerate(root.children[j], leafs, orgUserArray,orgWorkGroupArray);
                if( hasChild ) return true;
            }
        }
        return false;
        
    }
    function maxLeafId(root){
        var max = 0;
        for(var i=0; i<root.length; i++){
            if( root[i].children != null){
                var tmp = maxLeafId(root[i].children);
                if( tmp > max ) max = tmp;
            }
            if(root[i].id > max) max = root[i].id;
        }
        return max;
    }
    function formatData2Option(data){
        return {value:data.id, label: data.family_name+" "+data.name+"("+data.username+")("+data.mobile+")" };
    }
    function formatData2Option2(data){
        return  data.familyName+" "+data.name+"("+data.username+")("+data.mobile+")";
    }
</script>
<style>
.ivu-tree ul li{
    margin: 4px 0px;
}
</style>