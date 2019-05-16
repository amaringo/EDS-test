export class BreachModel {
  constructor(
    public Name: string,
    public Title?: string,
    public Domain?: string,
    public LogoPath?: string,
    public Description?: string,
  ) {} // Полный список и описание на https://haveibeenpwned.com/API/v2#BreachModel
}
