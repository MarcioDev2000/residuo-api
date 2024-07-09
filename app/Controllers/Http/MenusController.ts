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
          { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: '/dashboard' }
        ]
      },
      {
        items: [
          { label: 'Residuos', icon: 'pi pi-fw pi-shopping-cart', routerLink: '/dashboard/residuos' },
          { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: '/charts' },
        ]
      },
      {
        label: 'Configurações',
        icon: 'pi pi-fw pi-cog',
        items: [
          { label: 'Perfil', icon: 'pi pi-fw pi-user', routerLink: '/settings/profile' },
          { label: 'Sair', icon: 'pi pi-fw pi-sign-out', routerLink: '/' }
        ]
      },
      {
        label: 'Relatórios',
        icon: 'pi pi-fw pi-file',
        items: [
          { label: 'Financeiros', icon: 'pi pi-fw pi-money-bill', routerLink: '/reports/financial' },
          { label: 'Operacionais', icon: 'pi pi-fw pi-list', routerLink: '/reports/operational' }
        ]
      }
    ];

    return response.json(menu);
  }
}
