import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var _this = this;
    return this.store.find('user', this.get('session.authData.uid')).then(function(user) {
      if (user.get('newUser')) {
        user.set('newUser', false);
        return user.save().then(function(user) {
          return _this.store.createRecord('script', {
            uid: user,
            title: "Brick and Steel: Example Script",
            body: scriptBody
          });
        });
      } else {
        return _this.store.createRecord('script', {
          uid: user
        }).save();
      }
    });
  },

  setupController: function(controller, model) {
    controller.set('model', model);
    controller.set('controllers.application.script', model);
  }
});

var scriptBody = "Title:\n    _**BRICK & STEEL**_\n    _**FULL RETIRED**_\nCredit: Written by\nAuthor: Stu Maschwitz\nSource: Story by KTM\nDraft date: 1/20/2012\nContact:\n    Next Level Productions\n    1588 Mission Dr.\n    Solvang, CA 93463\nCopyright: (c) 2003 Columbia Pictures\n\nEXT. BRICK'S PATIO - DAY\n\nA gorgeous day.  The sun is shining.  But BRICK BRADDOCK, retired police detective, is sitting quietly, contemplating -- something.\n\nThe SCREEN DOOR slides open and DICK STEEL, his former partner and fellow retiree, emerges with two cold beers.\n\nSTEEL\nBeer's ready!\n\nBRICK\nAre they cold?\n\nSTEEL\nDoes a bear crap in the woods?\n\nSteel sits.  They laugh at the dumb joke.\n\nSTEEL\n(beer raised)\nTo retirement.\n\nBRICK\nTo retirement.\n\nThey drink long and well from the beers.\n\nAnd then there's a long beat.  \nLonger than is funny.  \nLong enough to be depressing.\n\nThe men look at each other.\n\nSTEEL\nScrew retirement.\n\nBRICK ^\nScrew retirement.\n\nSMASH CUT TO:\n\nINT. TRAILER HOME - DAY\n\nThis is the home of THE BOY BAND, AKA DAN and JACK.  They too are drinking beer, and counting the take from their last smash-and-grab.  Money, drugs, and ridiculous props are strewn about the table.\n\nJACK\n(in Vietnamese, subtitled)\n*Did you know Brick and Steel are retired?*\n\nDAN\nThen let's retire them.  \n_Permanently_.\n\nJack begins to argue vociferously in Vietnamese (?), But mercifully we...\n\nCUT TO:\n\nEXT. BRICK'S POOL - DAY\n\nSteel, in the middle of a heated phone call:\n\nSTEEL\nThey're coming out of the woodwork!\n(pause)\nNo, everybody we've put away!\n(pause)\nPoint Blank Sniper?\n\n.SNIPER SCOPE POV\n\nFrom what seems like only INCHES AWAY.  _Steel's face FILLS the *Leupold Mark 4* scope_.\n\nSTEEL\nThe man's a myth!\n\nSteel turns and looks straight into the cross-hairs.\n\nSTEEL\n(oh crap)\nHello...\n\nCUT TO:\n\n.OPENING TITLES\n\n> BRICK BRADDOCK <\n> & DICK STEEL IN <\n\n> BRICK & STEEL <\n> FULL RETIRED <\n\nSMASH CUT TO:\n\nEXT. WOODEN SHACK - DAY\n\nCOGNITO, the criminal mastermind, is SLAMMED against the wall.\n\nCOGNITO\nWoah woah woah, Brick and Steel!\n\nSure enough, it's Brick and Steel, roughing up their favorite usual suspect.\n\nCOGNITO\nWhat is it you want with me, DICK?\n\nSteel SMACKS him.\n\nSTEEL\nWho's coming after us?\n\nCOGNITO\nEveryone's coming after you mate!  Scorpio, The Boy Band, Sparrow, Point Blank Sniper...\n\nAs he rattles off the long list, Brick and Steel share a look.  This is going to be BAD.\n\nCUT TO:\n\nINT. GARAGE - DAY\n\nBRICK and STEEL get into Mom's PORSCHE, Steel at the wheel.  They pause for a beat, the gravity of the situation catching up with them.\n\nBRICK\nThis is everybody we've ever put away.\n\nSTEEL\n(starting the engine)\nSo much for retirement!\n\nThey speed off.  To destiny!\n\nCUT TO:\n\nEXT. PALATIAL MANSION - DAY\n\nAn EXTREMELY HANDSOME MAN drinks a beer.  Shirtless, unfortunately.\n\nHis minion approaches offscreen:\n\nMINION\nWe found Brick and Steel!\n\nHANDSOME MAN\nI want them dead.  DEAD!\n\nBeer flies.\n\n> BURN TO PINK.\n\n> THE END <";
