class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        //Create constants for the monster location
        this.bodyX = 300;
        this.bodyY = 350;

        this.armRX = this.bodyX + 100;
        this.armY = this.bodyY + 75;
        this.armLX = this.bodyX - 100;

        this.legRX = this.bodyX + 40;
        this.legY = this.bodyY + 100;
        this.legLX = this.bodyX - 40;

        this.hornRX = this.bodyX + 60;
        this.hornY = this.bodyY - 60;
        this.hornLX = this.bodyX - 60;

        this.mouthY = this.bodyY + 50;
        this.mouthC = this.bodyY + 50;

        this.counter = 0;
        this.smileType = 'Closed';
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        // Load sprite atlas
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");
        
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability
        // Create the main body sprite
        //
        // this.add.sprite(x,y, "{atlas key name}", "{name of sprite within atlas}")
        //
        // look in spritesheet_default.xml for the individual sprite names
        // You can also download the asset pack and look in the PNG/default folder.
        my.sprite.armR = this.add.sprite(this.armRX, this.armY, "monsterParts", "arm_greenD.png");
        my.sprite.armL = this.add.sprite(this.armLX, this.armY, "monsterParts", "arm_greenD.png");
        my.sprite.armL.flipX = true;
        my.sprite.legR = this.add.sprite(this.legRX, this.legY, "monsterParts", "leg_greenA.png");
        my.sprite.legL = this.add.sprite(this.legLX, this.legY, "monsterParts", "leg_greenA.png");
        my.sprite.legL.flipX = true;

        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_greenD.png");

        my.sprite.hornR = this.add.sprite(this.hornRX, this.hornY, "monsterParts", "detail_dark_horn_large.png");
        my.sprite.hornL = this.add.sprite(this.hornLX, this.hornY, "monsterParts", "detail_dark_horn_large.png");
        my.sprite.hornL.flipX = true;

        my.sprite.eye = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "eye_human.png");
        my.sprite.mouthC = this.add.sprite(this.bodyX, this.mouthY, "monsterParts", "mouth_closed_happy.png");
        my.sprite.mouthO = this.add.sprite(this.bodyX, this.mouthY, "monsterParts", "mouthA.png");
        
        my.sprite.mouthO.visible = false;

        this.SKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.FKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update() {
        let my = this.my;    // create an alias to this.my for readability

        this.smileType = "Open";
        this.counter++;

        // Polling input: peace hand
        if (this.SKey.isDown) {
            switch (this.smileType) {
                case "Open":
                    this.smileType = "Closed";
                    my.sprite.mouthO.visible = false;
                    my.sprite.mouthC.visible = true;
                    break;
                default:
                    console.log("Error: unknown smile");
            }
        }    

        if (this.FKey.isDown) {
            switch (this.smileType) {
                case "Open":
                    this.smileType = "Closed";
                    my.sprite.mouthO.visible = true;
                    my.sprite.mouthC.visible = false;
                    break;
                default:
                    console.log("Error: unknown smile");
            }
        }    

        if (this.AKey.isDown) {
            my.sprite.body.x--;
            my.sprite.armR.x--;
            my.sprite.armL.x--;
            my.sprite.hornR.x--;
            my.sprite.hornL.x--;
            my.sprite.eye.x--;
            my.sprite.mouthO.x--;
            my.sprite.mouthC.x--;
            my.sprite.legR.x--;
            my.sprite.legL.x--;
        }
        
        if (this.DKey.isDown) {
            my.sprite.body.x++;
            my.sprite.armR.x++;
            my.sprite.armL.x++;
            my.sprite.hornR.x++;
            my.sprite.hornL.x++;
            my.sprite.eye.x++;
            my.sprite.mouthO.x++;
            my.sprite.mouthC.x++;
            my.sprite.legR.x++;
            my.sprite.legL.x++;
        }
    }
}