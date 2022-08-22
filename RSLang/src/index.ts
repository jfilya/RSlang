import './scss/global.scss';
import { BackendAPIController } from './controller/api/api';

BackendAPIController.signIn('mail@mail.ru', 'aokadadadsljhgugvguuvuu').then(() => BackendAPIController.getAllWords(0, 0).then(res=>console.log(res)));