export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Home',
        to: '/home',
        icon: 'cil-house'
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Administration']
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Guests',
        to: '/guests',
        icon: 'cil-user'
      }
    ]
  }
]