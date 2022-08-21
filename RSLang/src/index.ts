import './scss/global.scss';
import { BackendAPI } from './view/api/api';

BackendAPI.signIn('mail@mail.ru', 'aokadadadsljhgugvguuvuu').then(res => BackendAPI.updateUserSettings('630244fcbe44cf0016ddcae9', 10).then(res=>console.log(res)));