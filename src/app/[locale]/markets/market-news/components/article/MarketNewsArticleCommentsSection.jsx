"use client";

import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import { useMemo, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

const SORT_OPTION_KEYS = [
  { value: "best", key: "sortOptions.best" },
  { value: "worst", key: "sortOptions.worst" },
  { value: "newest", key: "sortOptions.newest" },
  { value: "oldest", key: "sortOptions.oldest" },
  { value: "recently-updated", key: "sortOptions.recentlyUpdated" },
  { value: "least-recently-updated", key: "sortOptions.leastRecentlyUpdated" },
  { value: "most-controversial", key: "sortOptions.mostControversial" },
  { value: "least-controversial", key: "sortOptions.leastControversial" },
];

const REACTION_EMOJIS = ["😎", "🤨", "😋"];

function GoogleIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="#1877F2" aria-hidden>
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  );
}

function CommentAvatar({ name }) {
  return (
    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#293B93] bg-[#E8EDFA] text-sm font-semibold text-[#293B93]">
      {name.charAt(0)}
    </span>
  );
}

function SocialLoginPopover({ onClose }) {
  const t = usePathTranslation("marketNewsArticlePage.comments");

  return (
    <div className="absolute left-0 top-full z-20 mt-2 w-[280px] rounded-[10px] border border-[#E0E0E0] bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,0.1)]">
      <p className="TextSmall font-medium uppercase tracking-[0.06em] text-[#828282]">{t("useSocialNetwork", "Use social network")}</p>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onClose}
          className="TextSmall inline-flex h-10 items-center justify-center gap-2 rounded-[8px] border border-[#E0E0E0] bg-white font-normal text-[#4E4E4E] transition hover:border-[#293B93]/30"
        >
          <GoogleIcon />
          Google
        </button>
        <button
          type="button"
          onClick={onClose}
          className="TextSmall inline-flex h-10 items-center justify-center gap-2 rounded-[8px] border border-[#E0E0E0] bg-white font-normal text-[#4E4E4E] transition hover:border-[#293B93]/30"
        >
          <FacebookIcon />
          Facebook
        </button>
      </div>
    </div>
  );
}

function SignInSplitButton() {
  const t = usePathTranslation("marketNewsArticlePage.comments");
  const tA11y = usePathTranslation("common.a11y");
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-flex">
      <button
        type="button"
        className="TextButton inline-flex h-10 items-center justify-center rounded-l-[8px] bg-[#293B93] px-5 font-semibold text-white transition hover:bg-[#243575]"
      >
        {t("signIn", "Sign In")}
      </button>
      <button
        type="button"
        aria-expanded={open}
        aria-label={tA11y("moreSignInOptions", "More sign in options")}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-10 items-center justify-center rounded-r-[8px] border-l border-white/25 bg-[#293B93] px-2.5 text-white transition hover:bg-[#243575]"
      >
        <FiChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>
      {open && <SocialLoginPopover onClose={() => setOpen(false)} />}
    </div>
  );
}

function CommentComposer({ showCancel = false, onCancel, showEmojis = false, showSplitSignIn = false }) {
  const t = usePathTranslation("marketNewsArticlePage.comments");

  return (
    <div className="rounded-[10px] bg-[#F2F2F2] p-4 md:p-6">
      {showEmojis && (
        <div className="mb-3 flex flex-col gap-2">
          {REACTION_EMOJIS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              aria-label={`React with ${emoji}`}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg shadow-sm transition hover:shadow-md"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      <textarea
        rows={7}
        placeholder={t("yourCommentPlaceholder", "Your comment here")}
        className="TextSmall w-full resize-none rounded-[10px] border border-[#E0E0E0] bg-white px-4 py-3 font-normal text-[#4E4E4E] outline-none placeholder:text-[#9AA3C7] focus:border-[#293B93]/40"
      />

      <div className={`mt-2 flex flex-wrap items-center gap-3 ${showCancel ? "justify-between" : "justify-start"}`}>
        {showCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="TextButton inline-flex h-10 items-center justify-center rounded-[8px] border border-[#293B93] bg-white px-5 font-semibold text-[#293B93] transition hover:bg-[#FAFBFE]"
          >
            {t("cancel", "Cancel")}
          </button>
        ) : null}

        {showSplitSignIn ? <SignInSplitButton /> : (
          <button
            type="button"
            className="TextButton inline-flex h-10 items-center justify-center rounded-[8px] bg-[#293B93] px-6 font-semibold text-white transition hover:bg-[#243575]"
          >
            {t("signIn", "Sign In")}
          </button>
        )}
      </div>
    </div>
  );
}

function SortDropdown({ value, onChange }) {
  const t = usePathTranslation("marketNewsArticlePage.comments");
  const [open, setOpen] = useState(false);
  const sortOptions = useMemo(
    () =>
      SORT_OPTION_KEYS.map((option) => ({
        value: option.value,
        label: t(option.key, option.key.split(".").pop()),
      })),
    [t]
  );
  const activeLabel = sortOptions.find((option) => option.value === value)?.label ?? t("sortOptions.recentlyUpdated", "Recently updated");

  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="TextSmall inline-flex items-center gap-1.5 font-normal text-[#000]"
      >
        {t("sortBy", "Sort by")} <span className="font-semibold text-[#000]">{activeLabel}</span>
        <FiChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-20 mt-2 min-w-[220px] overflow-hidden rounded-[8px] border border-[#E0E0E0] bg-white py-1 shadow-[0_8px_24px_rgba(0,0,0,0.1)]">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`TextSmall block w-full px-4 py-1.5 text-left font-normal transition hover:bg-[#FAFBFE] ${option.value === value ? "bg-[#F3F4F6] font-medium text-[#000]" : "text-[#141412]"
                }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function CommentItem({ comment, depth = 0, replyingToId, onReply, onCancelReply }) {
  const t = usePathTranslation("marketNewsArticlePage.comments");
  const [hidden, setHidden] = useState(false);
  const asked = comment.asked ?? comment.date ?? "";
  const category = comment.category ?? "General";
  const isReplying = replyingToId === comment.id;

  if (hidden) {
    return (
      <div className={depth > 0 ? "ml-12" : ""}>
        <button
          type="button"
          onClick={() => setHidden(false)}
          className="TextSmall font-medium text-[#293B93] hover:underline"
        >
          {t("showComment", "Show comment")}
        </button>
      </div>
    );
  }

  return (
    <div className={depth > 0 ? "relative ml-12 mt-5 pl-4" : ""}>
      {depth > 0 && (
        <span className="absolute -left-4 top-0 h-full w-px bg-[#E0E0E0]" aria-hidden />
      )}

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-4">
          <CommentAvatar name={comment.author} />
          <div className="flex items-center gap-8">
            <p className="Text font-semibold text-[#000]">{comment.author}</p>
            <p className="TextSmall font-normal text-[#7C7F85]">{t("asked", "Asked:")} {asked}</p>
            <p className="TextSmall font-normal text-[#7C7F85]">{t("in", "In:")} {category}</p>
          </div>
        </div>
        <div className="min-w-0 ">
          <p className="TextSmall mt-3 font-normal leading-[1.6] text-[#141412]">{comment.text}</p>
          <div className="mt-3 flex items-center gap-4">
            <button
              type="button"
              onClick={() => onReply(comment.id)}
              className="TextSmall font-medium text-[#293B93] hover:underline"
            >
              {t("reply", "Reply")}
            </button>
            <button
              type="button"
              onClick={() => setHidden(true)}
              className="TextSmall font-medium text-[#293B93] hover:underline"
            >
              {t("hide", "Hide")}
            </button>
          </div>

          {isReplying && (
            <div className="mt-5 flex gap-3">
              <div className="flex flex-col items-center gap-2 pt-1">
                {REACTION_EMOJIS.map((emoji) => (
                  <span key={emoji} className="text-lg" aria-hidden>
                    {emoji}
                  </span>
                ))}
              </div>
              <div className="min-w-0 flex-1">
                <CommentComposer showCancel showEmojis={false} showSplitSignIn onCancel={onCancelReply} />
              </div>
            </div>
          )}
        </div>
      </div>

      {comment.replies?.map((reply) => (
        <CommentItem
          key={reply.id}
          comment={reply}
          depth={depth + 1}
          replyingToId={replyingToId}
          onReply={onReply}
          onCancelReply={onCancelReply}
        />
      ))}
    </div>
  );
}

export default function MarketNewsArticleCommentsSection({ comments = [] }) {
  const [sortBy, setSortBy] = useState("recently-updated");
  const [replyingToId, setReplyingToId] = useState(null);

  const sortedComments = useMemo(() => {
    const list = [...comments];

    if (sortBy === "oldest" || sortBy === "least-recently-updated") {
      return list.reverse();
    }

    return list;
  }, [comments, sortBy]);

  return (
    <section className="bg-white py-8 md:py-10">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <FadeInSection>
            <CommentComposer />
          </FadeInSection>

          <FadeInSection delay={0.2}>
          {sortedComments.length > 0 && (
            <div className="mt-4">
              <div className="mb-4 flex items-center justify-end">
                <SortDropdown value={sortBy} onChange={setSortBy} />
              </div>

              <div className="space-y-8">
                {sortedComments.map((comment, index) => (
                  <div key={comment.id}>
                    {index > 0 && <div className="mb-8 border-t border-dashed border-[#D9D9D9]" aria-hidden />}
                    <CommentItem
                      comment={comment}
                      replyingToId={replyingToId}
                      onReply={setReplyingToId}
                      onCancelReply={() => setReplyingToId(null)}
                    />
                  </div>
                ))}
              </div>
            </div>
            )}
          </FadeInSection>

          <FadeInSection delay={0.3}>
          {!replyingToId && sortedComments.length > 0 && (
            <div className="mt-8 border-t border-dashed border-[#D9D9D9] pt-8">
              <div className="flex gap-3">
                {/* <div className="flex flex-col items-center gap-2 pt-1">
                  {REACTION_EMOJIS.map((emoji) => (
                    <span key={emoji} className="text-lg" aria-hidden>
                      {emoji}
                    </span>
                  ))}
                </div> */}
                <div className="min-w-0 flex-1">
                  <CommentComposer showSplitSignIn />
                </div>
              </div>
            </div>
          )}
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
