export interface Icons{
  icon:string,
  title:string,
  isRight:boolean,
  count?:number 
}
type IconList = Icons[]


export const iconsTop:IconList=[
  {
    icon:'download-filled',
    title:'我的下载',
    isRight:true,
    count:2
  },
  {
    icon:'star-filled',
    title:'我的评分',
    isRight:true,
    count:1
  },
  {
    icon:'chatboxes-filled',
    title:'联系我们',
    isRight:false,
  },
]
//底部

export const iconsBottom:IconList=[
  {
    icon:'notification-filled',
    title:'订阅更新',
    isRight:false,
  },
  {
    icon:'flag-filled',
    title:'常见问题',
    isRight:false,
  }
]