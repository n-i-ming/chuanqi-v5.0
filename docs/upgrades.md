# Upgrades

Useful functions for dealing with Upgrades and implementing their effects:

- hasUpgrade(layer, id): determine if the player has the upgrade
- upgradeEffect(layer, id): Returns the current effects of the upgrade, if any
- buyUpgrade(layer, id): Buys an upgrade directly (if affordable)

Hint: Basic point gain is calculated in [mod.js](/js/mod.js)'s "getPointGen" function.

Upgrades are stored in the following format:

```js
upgrades: {
    11: {
        description: "Blah",
        cost: new OmegaNum(100),
        etc
    },
    etc
}
```

Usually, upgrades should have an id where the first digit is the row and the second digit is the column.

Individual upgrades can have these features:

- title: **optional**. Displayed at the top in a larger font. It can also be a function that returns updating text. Can use basic HTML.

- description: A description of the upgrade's effect. *You will also have to implement the effect where it is applied.* It can also be a function that returns updating text. Can use basic HTML.

- effect(): **optional**. A function that calculates and returns the current values of any bonuses from the upgrade. Can return a value or an object containing multiple values.

- effectDisplay(): **optional**. A function that returns a display of the current effects of the upgrade with formatting. Default displays nothing. Can use basic HTML.

- fullDisplay(): **OVERRIDE**. Overrides the other displays and descriptions, and lets you set the full text for the upgrade. Can use basic HTML.

- cost: A OmegaNum for the cost of the upgrade. By default, upgrades cost the main prestige currency for the layer.

- unlocked(): **optional**. A function returning a bool to determine if the upgrade is visible or not. Default is unlocked.

- onPurchase(): **optional**. This function will be called when the upgrade is purchased. Good for upgrades like "makes this layer act like it was unlocked first".

- style: **optional**. Applies CSS to this upgrade, in the form of an object where the keys are CSS attributes, and the values are the values for those attributes (both as strings).

- layer: **assigned automagically**. It's the same value as the name of this layer, so you can do `player[this.layer].points` or similar.

- id: **assigned automagically**. It's the "key" which the upgrade was stored under, for convenient access. The upgrade in the example's id is 11.

By default, upgrades use the main prestige currency for the layer. You can include these to change them (but it needs to be a OmegaNum):

- currencyDisplayName: **optional**. The name to display for the currency for the upgrade.

- currencyInternalName: **optional**. The internal name for that currency.

- currencyLayer: **optional**. The internal name of the layer that currency is stored in. If it's not in a layer (like Points), omit. If it's not stored directly in a layer, instead use the next feature.

- currencyLocation: **optional**. If your currency is stored in something inside a layer (e.g. a buyable's amount), you can access it this way. This is a function returning the object in "player" that contains the value (like `player[this.layer].buyables`)

If you want to do something more complicated like upgrades that cost two currencies, you can override the purchase system with these (and you need to use fullDisplay as well)

- canAfford(): **OVERRIDE**, a function determining if you are able to buy the upgrade

- pay(): **OVERRIDE**, a function that reduces your currencies when you buy the upgrade

- branches: **optional**, This is primarially useful for upgrade trees. An array of upgrade ids. A line will appear from this upgrade to all of the upgrades in the list. Alternatively, an entry in the array can be a 2-element array consisting of the upgrade id and a color value. The color value can either be a string with a hex color code, or a number from 1-3 (theme-affected colors).