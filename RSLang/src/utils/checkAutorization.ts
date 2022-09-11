import { BackendAPIController } from '../controller/api/api';
import { IRegister } from '../controller/api/interfaces';

async function checkAutorization(): Promise<boolean> {
  const user = await BackendAPIController.getUserByID();
  if (user && localStorage.userID === (user as unknown as IRegister).id) {
    return true;
  } return false;
}
export default checkAutorization;
