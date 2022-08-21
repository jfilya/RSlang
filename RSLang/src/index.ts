import './scss/global.scss';
import { BackendAPI } from './view/api/api';

BackendAPI.signIn('mail@mail.ru', 'aokadadadsljhgugvguuvuu').then(res => BackendAPI.getAllAggregatedWords('630244fcbe44cf0016ddcae9', 0, 1, 20).then(res=>console.log(res)));