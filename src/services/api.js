/* eslint-disable no-console */
import Parse from 'parse'
Parse.initialize("6Me2XHk4VReucJ9buwts");
Parse.serverURL = 'https://todo-api-parse.mpk.dynu.net/parse'

class Todo extends Parse.Object {
    static className = 'Todo'
    static register() {
        super.registerSubclass(Todo.className,Todo)
    }
    constructor(){
        super(Todo.className)
    }
}

export default {
    successTimeout: 3000,
    errorTimeout: 3000,
    user: {
        login(u,p){
            return Parse.User.logIn(u,p)
        },
        logout(){
            return Parse.User.logOut()
        },
        restore() {
            if (Parse.User.current()) return Parse.User.current()
            else return false
        },
        current(){
            return Parse.User.current()
        },
        signup(data){
            let user = new Parse.User()
            const keys=Object.keys(data)
            for (let k in keys){
                user.set(keys[k],data[keys[k]])
            }
            return user.signup()
        }
    },
    todo: {
        async get(user,limit){
            Todo.register()
            const q = new Parse.Query(Todo)
            if (limit) q.limit(limit)
            return q.find()
        },
        create(data){
            const currentUser = Parse.User.current()
            const todo = new Todo()
            const keys = Object.keys(data)
            todo.set('author',{"__type": "Pointer","className": "_User","objectId": currentUser.id})
            const acl = new Parse.ACL(currentUser)
            acl.setPublicReadAccess(false)
            acl.setPublicWriteAccess(false)
            acl.setReadAccess(currentUser.id,true)
            acl.setWriteAccess(currentUser.id,true)
            todo.setACL(acl)
            for (let k in keys){
                todo.set(keys[k],data[keys[k]])
            }
            JSON.stringify(todo)
            return todo.save()
        },
        // update(user,todo,data){

        // },
        // delete(user, todo){

        // }
    }
}