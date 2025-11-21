+++
title =  "Home"
type = "home"
draft = false
+++


{{< showcase-section
    title="Showcase section"
    subtitle="Subtitle - coming from <code>home.md</code>"
    buttonText="Email"
    description="<strong>Strong</strong>, <em>italic</em> and normal text. This comes from <a href='https://github.com/zetxek/adritian-demo/blob/main/content/home/home.md?plain=1'><code>home.md</code></a>, using the <code>showcase-section</code> <a href=''>shortcode</a>.<br/>Below you can see the social links, provided by the <code>platform-links</code> shortcode."
    imgSrc="images/icon.png"
    imgScale="0.5"
 >}}

{{< platform-links >}}
    {{< link icon="whatsapp" url="https://whatsapp.com/channel/0029Vb62oilIyPtNZRvjI61K" >}}
    {{< link icon="linkedin" url="https://www.linkedin.com/company/bacarotech" >}}
    {{< link icon="square-github" url="https://github.com/BacaroTech" >}}
    {{< link icon="tiktok" url="https://www.tiktok.com/@bacarotech" >}}
    {{< link icon="youtube" url="https://www.youtube.com/@Bacarotech" >}}
    {{< link icon="instagram" url="https://www.instagram.com/bacarotechofficial/" >}}

{{< /platform-links >}}

{{< /showcase-section >}}

{{< about-section
    title="About me"
    content="This content is using the <code>about-section</code> shortcode. <br/>You can write <code>HTML</code>, as long as you <em>wrap it</em> accordingly. "
    button_icon="icon-user"
    button_text="Check my skills"
    button_url="/skills"
    imgSrc="images/about/user-picture.png"
    imgScale="0.5"
    text_align="center"
 >}}

{{< project-list
    title="I nostri progetti" >}}


{{< testimonial-section
    title="Cosa dicono di noi" >}}

{{< spacer size="large" >}}

## Extra home content

Additional content added after the `section` blocks, in the `home.md` file. 

Here you could freestyle, add other shortcodes, ...  Or just let the content empty, and rely on the shortcode sections alone.

{{< spacer size="small" >}}

{{< text-section
title="Extra (centered) content"
centered="true"
>}}

You can also use the `text-section` shortcode to add centered texts

{{< /text-section >}}
