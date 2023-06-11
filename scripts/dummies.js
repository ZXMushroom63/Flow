let x = {
    func: (v1)=>{return v1},
    fields: [
        {
            func:(v1,v2)=>{return v1*v2},
            fields:[
                {
                    func: ([])=>{return v1+v2},
                    fields:[
                        1,
                        2
                    ]
                },
                {
                    func: (v1,v2)=>{return v1/v2},
                    fields:[
                        255,
                        2
                    ]
                }
            ]
        }
    ]
}

let xCompiled = {
    func: ([])=>{
        return func1([])
    }
}

function getBlue(){
    x.func(x.fields)
}