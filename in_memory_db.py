
class IMDB:

      heroes = [
                  {'id': 11, 'name': 'Mr. Nice'},
                  {'id': 12, 'name': 'Narco'},
                  {'id': 13, 'name': 'Bombasto'},
                  {'id': 14, 'name': 'Celeritas'},
                  {'id': 15, 'name': 'Magneta'},
                  {'id': 16, 'name': 'RubberMan'},
                  {'id': 17, 'name': 'Dynama'},
                  {'id': 18, 'name': 'Dr IQ'},
                  {'id': 19, 'name': 'Magma'},
                  {'id': 20, 'name': 'Tornado'}
                ];
            

      def getAllHeroes(self):
            return self.heroes

      def getHero(self, heroId):
            hero = [ hero for hero in self.heroes if hero['id'] == heroId]
            return hero[0]

      def updateHero(self, heroId, heroData):
            for hero in self.heroes:
                  if hero['id'] == heroId:
                        hero['name'] = heroData['name']

      def createHero(self, heroData):
            lastId = self.heroes[-1]['id']
            new_hero = {'id': lastId + 1, 'name': heroData['name']}
            self.heroes.append(new_hero)
            return self.heroes[-1]

      def deleteHero(self, heroId):
            hero = self.getHero(heroId)
            self.heroes.remove(hero)

      def searchHero(self, request_dict):
            name = request_dict.get('name')
            heroes = []
            for hero in self.heroes:
                  if name.lower() in hero['name'].lower():
                        heroes.append(hero)
            return heroes
