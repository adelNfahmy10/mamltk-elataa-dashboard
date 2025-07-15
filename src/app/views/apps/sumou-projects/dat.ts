// import { currency, currentYear } from '@common/constants'

// export type CustomerType = {
//   photo: string
//   name: string
// }

// export type OrderType = {
//   customer: CustomerType
//   purchaseDate: string
//   contact: string
//   propertyType: string
//   amount: string
//   purchaseProperties: string
//   amountStatus: string
// }

export interface IProjectDetails {
  id: number;
  picture: string;
  type: string;
}

export interface IProject {
  id: number;
  title: string;
  description: string;
  type: number;
  price: number;
  location: string;
  city: string;
  roomNumbers: number;
  area: string;
  mainPicture: string;
  projectDetails?: IProjectDetails[];
}

// export const projectData: IProject[] = [
//   {
//     id: 1,
//     title: 'New 1',
//     price: 22,
//     location: 'New 1 Location',
//     city: 'New 1 City',
//     roomNumbers: 10,
//     area: 'New 1 Area',
//     description: 'Project description here',
//     type: 1,
//     mainPicture: 'assets/images/blog/blog.jpg',
//   },
//   {
//     id: 2,
//     title: 'New 2',
//     price: 22,
//     location: 'New 2 Location',
//     city: 'New 2 City',
//     roomNumbers: 10,
//     area: 'New 2 Area',
//     description: 'Project description here',
//     type: 1,
//     mainPicture: 'assets/images/blog/blog.jpg',
//     projectDetails:[
//       {
//         "id": 17,
//         "picture": "assets/images/blog/blog.jpg",
//       },

//       {
//         "id": 18,
//         "picture": "assets/images/blog/blog.jpg",
//         "title": "New Project 1",
//         "description": "ايش حالك هدا تاني صورة ليك"
//       },

//       {
//         "id": 19,
//         "picture": "assets/images/blog/blog.jpg",
//         "title": "New Project 2",
//         "description": "ايش حالك هدا ليك"
//       },

//       {
//         "id": 20,
//         "picture": "assets/images/blog/blog.jpg",
//         "title": "New Project 3",
//         "description": "ايش حالك هدا تاني صورة"
//       },
//     ]
//   },
//   {
//     id: 3,
//     title: 'New 3',
//     price: 22,
//     location: 'New 3 Location',
//     city: 'New 3 City',
//     roomNumbers: 10,
//     area: 'New 3 Area',
//     description: 'Project description here',
//     type: 1,
//     mainPicture: 'assets/images/blog/blog.jpg',
//   }
//   ,
//   {
//     id: 4,
//     title: 'New 4',
//     price: 22,
//     location: 'New 4 Location',
//     city: 'New 4 City',
//     roomNumbers: 10,
//     area: 'New 4 Area',
//     description: 'Project description here',
//     type: 1,
//     mainPicture: 'assets/images/blog/blog.jpg',
//   }
//   ,
//   {
//     id: 5,
//     title: 'New 5',
//     price: 22,
//     location: 'New 5 Location',
//     city: 'New 5 City',
//     roomNumbers: 10,
//     area: 'New 5 Area',
//     description: 'Project description here',
//     type: 1,
//     mainPicture: 'assets/images/blog/blog.jpg',
//   }
//   ,
//   {
//     id: 6,
//     title: 'New 7',
//     price: 22,
//     location: 'New 7 Location',
//     city: 'New 7 City',
//     roomNumbers: 10,
//     area: 'New 7 Area',
//     description: 'Project description here',
//     type: 1,
//     mainPicture: 'assets/images/blog/blog.jpg',
//   }
// ];
