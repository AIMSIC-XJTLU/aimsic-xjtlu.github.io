# AIMSIC-XJTLU website

Official website of AIMSIC-XJTLU.

- Website: https://aimsic-xjtlu.github.io/
- Compatibility entry: https://aimsic-xjtlu.github.io/aims/ (redirects to the homepage)

## 内容维护

课题组正文保存在 `index.md` 中，可在 GitHub 上编辑并提交到 `main` 分支。
GitHub Pages 使用 Jekyll 自动生成并发布网站。

- `index.md`：课题组介绍、研究项目、成员、新闻与联系方式。
- `_layouts/aims.html`：网页结构、导航和页脚。
- `_config.yml`：网站名称、网址和描述。
- `assets/css/aims.css`：导航与移动端样式。
- `assets/css/main.css`：保留原 AIMS 页面的主题样式。

发布设置为 **Deploy from a branch → main → / (root)**。
本仓库只包含课题组 AIMS 页面及必要样式，不包含原站的个人主页、相册、简历、个人出版物页面或个人统计配置。

主题来源与许可见 `THIRD_PARTY_NOTICES.md` 和 `LICENSE`。
