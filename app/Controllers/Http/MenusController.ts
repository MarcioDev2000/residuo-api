import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

interface MenuItem {
  label?: string;
  items?: MenuItem[];
  icon?: string;
  routerLink?: string;
  command?: (() => void) | string;
}

export default class MenusController {
  public async index({ response }: HttpContextContract) {
    const menu: MenuItem[] = [
      {
        label: 'Home',
        items: [
          { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: '/' }
        ]
      },
      {
        items: [
          { label: 'Residuos', icon: 'pi pi-fw pi-image', routerLink: '/residuo' },
          { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: '/charts' },
          { label: 'Sair', icon: 'pi pi-fw pi-sign-out', routerLink: '/charts' }
        ]
      }
    ];

    return response.json(menu);
  }
}
