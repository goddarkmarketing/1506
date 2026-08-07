const fs = require("fs");
const path = require("path");

const root = "d:/1506-new";
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");

// Collect <style> blocks that look header-related
const styles = [];
const re = /<style[^>]*>([\s\S]*?)<\/style>/gi;
let m;
while ((m = re.exec(html))) {
  const body = m[1];
  if (
    /r-bztko3|dg-brand|dg-marquee|dg-mega|dg-header|dg-top-menu|dg-lucide|language-currency/.test(
      body
    )
  ) {
    styles.push(body);
  }
}

console.log("matched style blocks", styles.length);
console.log(
  "total chars",
  styles.reduce((a, b) => a + b.length, 0)
);

// Also note: utility classes like .r-18u37iz live in early RN stylesheet - need those too
const allStyleBodies = [];
re.lastIndex = 0;
while ((m = re.exec(html))) allStyleBodies.push(m[1]);
console.log("all style blocks", allStyleBodies.length);
allStyleBodies.forEach((b, i) => console.log(i, b.length, b.slice(0, 60).replace(/\n/g, " ")));
