/* eslint-disable no-console */
import Parse from 'parse'
Parse.initialize(process.env.VUE_APP_PARSE_APP_ID);
Parse.serverURL = process.env.VUE_APP_PARSE_SERVER_URL

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
        signUp(data){
            let user = new Parse.User()
            const keys=Object.keys(data)
            for (let k in keys){
                user.set(keys[k],data[keys[k]])
            }
            return user.signUp()
        }
    },
    todo: {
        getAll(limit=false){
            Todo.register()
            const q = new Parse.Query(Todo)
            q.descending('createdAt')
            if (limit) q.limit(limit)
            return q.find()
        },
        getOne (id){
            Todo.register()
            const q = new Parse.Query(Todo)
            return q.get(id)
        },
        create(data){
            const currentUser = Parse.User.current()
            const todo = new Todo()
            const keys = Object.keys(data)
            todo.set('author',currentUser)
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
        update(payload){
            payload.todo.set(payload.prop,payload.value)
            return payload.todo.save()
        },
        delete(todo){
            return todo.destroy()
        }
    }
}