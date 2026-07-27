import re
import glob

files = glob.glob("/home/ouedraogo/Bureau/OpenSource/MentalChecker/client/src/components/**/*.tsx", recursive=True)

for file_path in files:
    with open(file_path, "r") as f:
        content = f.read()

    # Replace specific hardcoded colors with Tailwind semantic colors
    content = content.replace("bg-[#FDFCFB]", "bg-background")
    content = content.replace("bg-white", "bg-card")
    content = content.replace("text-stone-900", "text-foreground")
    content = content.replace("text-stone-800", "text-foreground")
    content = content.replace("text-stone-700", "text-foreground")
    content = content.replace("text-stone-600", "text-muted-foreground")
    content = content.replace("text-stone-500", "text-muted-foreground")
    content = content.replace("text-stone-400", "text-muted-foreground")
    content = content.replace("bg-stone-100", "bg-muted")
    content = content.replace("bg-stone-50", "bg-muted/50")
    content = content.replace("bg-stone-200", "bg-muted/80")
    content = content.replace("border-stone-100", "border-border/40")
    content = content.replace("border-stone-200", "border-border/60")
    content = content.replace("active:bg-stone-100", "active:bg-muted/50")
    content = content.replace("active:bg-stone-200", "active:bg-muted")
    content = content.replace("hover:bg-stone-200", "hover:bg-muted/80")
    content = content.replace("bg-stone-400", "bg-primary")

    with open(file_path, "w") as f:
        f.write(content)
