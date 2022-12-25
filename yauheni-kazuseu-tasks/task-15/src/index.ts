import { StorageAdd } from './components/storage/storage';
import './styles.scss';
import {Components} from './components/calendar/calendar'

let storage: StorageAdd = {
  storage: window.localStorage,
  addStorageConfig: function(): void {
    this.storage.clear();
    this.storage.month = JSON.stringify(['January','February','March','April','May','June','July','August','September','October','November','December']);
    this.storage.day = JSON.stringify(['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']);
    this.storage.weekends = JSON.stringify(['Saturday', 'Sunday']);
    this.storage.holidays = JSON.stringify({'4July2021': 'holiday','9July2021': 'holiday','25August2021': 'holiday'});
    this.storage.planners = JSON.stringify({'5July2021': 'Add story','10July2021': 'Read','20August2021': 'Programming'});
  }
}
let calendar = new Components.Calendar();

storage.addStorageConfig();
calendar.init();