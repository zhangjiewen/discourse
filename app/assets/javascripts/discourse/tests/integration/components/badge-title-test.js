import { discourseModule } from "discourse/tests/helpers/qunit-helpers";
import selectKit from "discourse/tests/helpers/select-kit-helper";
import componentTest, {
  setupRenderingTest,
} from "discourse/tests/helpers/component-test";
import EmberObject from "@ember/object";
import pretender from "discourse/tests/helpers/create-pretender";
import { click } from "@ember/test-helpers";

discourseModule("Integration | Component | badge-title", function (hooks) {
  setupRenderingTest(hooks);

  componentTest("badge title", {
    template:
      "{{badge-title selectableUserBadges=selectableUserBadges user=user}}",

    beforeEach() {
      this.set("subject", selectKit());
      this.set("selectableUserBadges", [
        EmberObject.create({
          id: 0,
          badge: { name: "(none)" },
        }),
        EmberObject.create({
          id: 42,
          badge_id: 102,
          badge: { name: "Test" },
        }),
      ]);
    },

    async test(assert) {
      pretender.put("/u/eviltrout/preferences/badge_title", () => [
        200,
        { "Content-Type": "application/json" },
        {},
      ]);
      await this.subject.expand();
      await this.subject.selectRowByValue(42);
      await click(".btn");
      assert.equal(this.currentUser.title, "Test");
    },
  });
});
