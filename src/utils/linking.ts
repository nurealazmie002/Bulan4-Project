import { LinkingOptions } from '@react-navigation/native';

const config = {
  screens: {
    Main: {
      screens: {
        AppContent: {
          screens: {
            Beranda: 'home',
            Cart: 'keranjang',
            Profile: {
              path: 'profil/:userId?',
              parse: {
                userId: (id: string) => id, 
              },
            },
          },
        },

        ProductDetail: {
          path: 'produk/:productId',
          parse: {
            productId: (id: string) => id, 
          },
        },
        
        Checkout: 'checkout',
      },
    },
    LoginAPI: 'login', 
  },
};

const linking: LinkingOptions<ReactNavigation.RootParamList> = {
  prefixes: ['ecommerceapp://', 'https://www.miniecommerce.com'],
  
  config,
};

export default linking;