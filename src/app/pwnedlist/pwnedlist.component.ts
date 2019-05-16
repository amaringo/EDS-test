import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HaveibeenpwnedApiService} from '../shared/haveibeenpwned-api.service';
import { BreachModel} from '../shared/models/breach.model';

@Component({
  selector: 'app-pwnedlist',
  templateUrl: './pwnedlist.component.html',
  styleUrls: ['./pwnedlist.component.scss']
})
export class PwnedlistComponent implements OnInit {

  @ViewChild('searchInput') searchInput: ElementRef;
  partBreaches: BreachModel[];
  allBreaches: BreachModel[];
  allFilteredBreaches: BreachModel[];
  searchTerm: string;

  constructor(private api: HaveibeenpwnedApiService) {}

  ngOnInit() {
    this.getAllBreaches();
    this.focusSearch();
  }

  focusSearch() {
    this.searchInput.nativeElement.focus();
  }

  /**
   * Отправляет запрос на получения общего списка утечек
   */
  getAllBreaches() {
    this.api.getAllBreaches().then((res) => {
      this.allBreaches = res;
      this.initBreachesPart(this.allBreaches);
    });
  }

  /**
   * Создает начальную порцию пунктов из 10 первых элементов списка.
   * @param fullList полный или отфильтрованный поиском список.
   */
  initBreachesPart(fullList: BreachModel[]) {
    this.partBreaches = fullList && fullList.length > 10 ? fullList.slice(0, 10) : fullList;
  }

  /**
   * Фильтрует полный список пунктов, записывает результат в allFilteredBreaches
   * @param term :string  - значение инпута поиска
   */
  filterBreaches(term: string) {
    const result = this.allBreaches.filter(
      (breach) =>
        breach.Name.toLowerCase().includes(term.toLowerCase()) ||
        breach.Domain.toLowerCase().includes(term.toLowerCase()));
    this.allFilteredBreaches = result;
    this.initBreachesPart(result);
  }

  /**
   * При достижении скроллом [infiniteScrollDistance]="2" ( это "осталось 20% прокрутки" ) добавляет в отображаемый
   * список еще 10 пунктов из общего списка.
   */
  onScroll() {
    const list = this.searchTerm ? this.allFilteredBreaches : this.allBreaches;
    const curLenght = this.partBreaches.length;
    if (list.length !== curLenght) {
      this.partBreaches.push(...list.slice(curLenght, curLenght + 10));
    }
  }
}
