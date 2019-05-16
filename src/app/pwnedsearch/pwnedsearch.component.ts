import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BreachModel } from '../shared/models/breach.model';
import { HaveibeenpwnedApiService } from '../shared/haveibeenpwned-api.service';

@Component({
  selector: 'app-pwnedsearch',
  templateUrl: './pwnedsearch.component.html',
  styleUrls: ['./pwnedsearch.component.scss']
})
export class PwnedsearchComponent implements OnInit {

  @ViewChild('searchInput') searchInput: ElementRef;
  partDiscredits: BreachModel[];
  foundDiscredits: BreachModel[];
  allBreaches: BreachModel[];
  searchTerm: string;
  searchType = 'everywhere';

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
    });
  }

  startSearch(searchType: string) {
    this.api.getAccountDiscredits(this.searchTerm, searchType)
      .then((res) => {
        this.foundDiscredits = res;
        this.initBreachesPart(this.foundDiscredits);
      })
      .catch((err) => {
        console.log(err);
        if (err.status === 404) {
          this.foundDiscredits = null;
        }
        this.initBreachesPart(this.foundDiscredits);
      });
  }

  /**
   * Создает начальную порцию пунктов из 10 первых элементов списка.
   * @param fullList список всех пунктов из ответа API.
   */
  initBreachesPart(fullList: BreachModel[]) {
    console.log(fullList);
    this.partDiscredits = fullList && fullList.length > 10 ? fullList.slice(0, 10) : fullList;
  }

  /**
   * При достижении скроллом [infiniteScrollDistance]="2" ( это "осталось 20% прокрутки" ) добавляет в отображаемый
   * список еще 10 пунктов из общего списка.
   */
  onScroll() {
    const list = this.foundDiscredits;
    const curLenght = this.partDiscredits.length;
    if (list.length !== curLenght) {
      this.partDiscredits.push(...list.slice(curLenght, curLenght + 10));
    }
  }

}
